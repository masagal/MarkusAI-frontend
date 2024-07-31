import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { GetToken } from "@clerk/types";
import { UserData } from "../utils/types";

const apiHost = import.meta.env.VITE_API_HOST;
const meEndpoint = "/api/users/me";

const getUserData = async (
  getToken: GetToken,
  navigate: ({ to }: { to: string }) => void
): Promise<UserData> => {
  const token = await getToken();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  return fetch(`${apiHost}${meEndpoint}`, {
    headers,
  }).then((response) => {
    console.log(response);
    if (response.ok) return response.json();
    navigate({ to: "/error/user-not-found" });
  });
};

const useUserData = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["userid"],
    queryFn: () => getUserData(getToken, navigate),
  });
};

export { useUserData, getUserData };
