import { useMutation } from "@tanstack/react-query";
import useUserData from "./useUserData";
import { useAuth } from "@clerk/clerk-react";
import { UserData } from "../utils/types";

const apiHost = import.meta.env.VITE_API_HOST;
const endpoint = "/requests";

const requestMutationDevelopment = async (mutationData) => {
  console.log("Mutation is not available in dev mode. Doing nothing.");
  console.log("Mutation data was: ", mutationData);
};

const requestMutation = async (
  mutationData: Request[],
  userData: UserData,
  getToken: () => Promise<string>
) => {
  const token = await getToken();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const url = `${apiHost}${endpoint}`;
  const opts = {
    method: "POST",
    headers,
    body: JSON.stringify({ requests: mutationData, userId: userData.id }),
  };

  return fetch(url, opts).then(
    (response) =>
      new Promise((resolve, reject) => (response.ok ? resolve("") : reject()))
  );
};

const useMutateRequests = () => {
  const userData = useUserData();
  const auth = useAuth();

  const mutationFunction =
    import.meta.env.MODE == "development"
      ? requestMutationDevelopment
      : requestMutation;

  return useMutation({
    mutationFn: (data) => mutationFunction(data, userData, auth.getToken),
  });
};

export default useMutateRequests;
