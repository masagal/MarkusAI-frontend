import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { GetToken } from "@clerk/types";
import { UserData, NewUserData } from "../utils/types";

const apiHost = import.meta.env.VITE_API_HOST;
const usersEndpoint = "/api/users";
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
  })
    .then((response) => {
      console.log("get my user data responds:");
      console.log(response);
      if (response.ok) return response.json();
      navigate({ to: "/error/user-not-found" });
    })
    .catch(() => Promise.reject());
};

const getAllUsers = async (getToken: GetToken): Promise<UserData[]> => {
  const token = await getToken();

  const url = `${apiHost}${usersEndpoint}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  return fetch(url, { headers }).then((response) => {
    if (!response.ok) {
      throw new Error("failed to fetch user data");
    }
    return response.json();
  }).then(data => {console.log(data);return data});
};

const createUser = async (
  getToken: GetToken,
  newUser: NewUserData
): Promise<UserData> => {
  const token = await getToken();

  const url = `${apiHost}${usersEndpoint}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to create new user");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

const useUsers = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(getToken),
  });
};

const useMyUserData = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["userid"],
    queryFn: () => getUserData(getToken, navigate),
  });
};

const useMutateUsers = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (data: NewUserData) => createUser(getToken, data),
  });
};

const resolveInvitation = async (getToken: GetToken, inviteToken: string) => {
  const token = await getToken();

  const url = `${apiHost}${usersEndpoint}/resolve-invitation?token=${inviteToken}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  return fetch(url, { headers }).then((response) => {
    if (!response.ok) {
      throw new Error("could not resolve invite.");
    }
    Promise.resolve();
  });
};

const useInvitation = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (inviteToken: string) =>
      resolveInvitation(getToken, inviteToken),
  });
};

export {
  useMyUserData as useUserData,
  getUserData,
  useUsers,
  getAllUsers,
  useMutateUsers,
  createUser,
  useInvitation,
};
