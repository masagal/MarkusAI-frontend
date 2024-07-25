import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

const apiHost = import.meta.env.VITE_API_HOST;
const endpoint = "/requests";

const requestMutationDevelopment = async (mutationData) => {
  console.log("Mutation is not available in dev mode. Doing nothing.");
  console.log("Mutation data was: ", mutationData);
};

const requestMutation = async (mutationData, getToken) => {
  const token = await getToken();
  const url = `${apiHost}${endpoint}`;
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ requests: mutationData, userId: "1" }),
  };

  return fetch(url, opts).then(
    (response) =>
      new Promise((resolve, reject) => (response.ok ? resolve("") : reject()))
  );
};

const useMutateRequests = () => {
  const auth = useAuth();

  const mutationFunction =
    import.meta.env.MODE == "development"
      ? requestMutationDevelopment
      : requestMutation;

  return useMutation({
    mutationFn: (data) => mutationFunction(data, auth.getToken),
  });
};

export default useMutateRequests;
