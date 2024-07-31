import { useAuth } from "@clerk/clerk-react";
import { GetToken } from "@clerk/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getUserData } from "./useUserData";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { MutationProduct } from "../utils/types";

const apiHost = import.meta.env.VITE_API_HOST;
const requestsEndpoint = "/requests";

const getRequests = async (getToken: GetToken) => {
  const token = await getToken();
  const url = `${apiHost}${requestsEndpoint}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

const useRequests = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["requests"],
    queryFn: () => getRequests(getToken),
  });
};

const useApproveRequests = () => {
  const auth = useAuth();
  const url = `${apiHost}${requestsEndpoint}`;
  const client = useQueryClient();

  return (requestId: number, approve: boolean) => {
    return auth
      .getToken()
      .then((token) => {
        console.log("Approving.");
        const body = { requestId, approve };
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        return fetch(url, {
          body: JSON.stringify(body),
          method: "PATCH",
          headers,
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("approval was unsuccessful");
        }
        client.invalidateQueries({ queryKey: ["requests"] });
      });
  };
};

const requestMutationDevelopment = async (mutationData: MutationProduct[]) => {
  console.log("Mutation is not available in dev mode. Doing nothing.");
  console.log("Mutation data was: ", mutationData);
};

const requestMutation = async (
  mutationData: MutationProduct[],
  getToken: GetToken,
  navigate: ({ to }: { to: string }) => void
) => {
  const token = await getToken();
  const { id: userId } = await getUserData(getToken, navigate);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const url = `${apiHost}${requestsEndpoint}`;
  const opts = {
    method: "POST",
    headers,
    body: JSON.stringify({ requests: mutationData, userId: userId }),
  };

  return fetch(url, opts).then(
    (response) =>
      new Promise((resolve, reject) => (response.ok ? resolve("") : reject()))
  );
};

const useMutateRequests = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const mutationFunction =
    import.meta.env.MODE == "development"
      ? requestMutationDevelopment
      : requestMutation;

  return useMutation({
    mutationFn: (data: MutationProduct[]) =>
      mutationFunction(data, auth.getToken, navigate),
  });
};

export { useRequests, useMutateRequests, useApproveRequests };
