import { useMutation } from "@tanstack/react-query";

const apiHost = import.meta.env.VITE_API_HOST;
const endpoint = "/requests";

// @ts-expect-error: Type error from controller and datetimepicker
const requestMutationDevelopment = async (mutationData) => {
  console.log("Mutation is not available in dev mode. Doing nothing.");
  console.log("Mutation data was: ", mutationData);
};
// @ts-expect-error: Type error from controller and datetimepicker
const requestMutation = async (mutationData) => {
  const url = `${apiHost}${endpoint}`;
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests: mutationData, userId: "1" }),
  };

  return fetch(url, opts).then(
    (response) =>
      new Promise((resolve, reject) => (response.ok ? resolve("") : reject()))
  );
};

const useMutateRequests = () => {
  const mutationFunction =
    import.meta.env.MODE == "development"
      ? requestMutationDevelopment
      : requestMutation;

  return useMutation({
    mutationFn: mutationFunction,
  });
};

export default useMutateRequests;
