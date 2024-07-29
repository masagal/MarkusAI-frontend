import { useAuth } from "@clerk/clerk-react";
import { GetToken } from "@clerk/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiHost = "http://localhost:8080"; // Hardcoding the API host for local development
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

export default useRequests;
