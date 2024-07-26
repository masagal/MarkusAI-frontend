import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const useUserData = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return useQuery({
    queryKey: ["userid"],
    queryFn: () => {
      return auth
        .getToken()
        .then((token) => {
          console.log(token);
          const headers = new Headers();
          headers.append("Authorization", `Bearer ${token}`);
          return fetch("http://localhost:8080/api/users/me", {
            headers,
          });
        })
        .then((response) => {
          console.log(response);
          if (response.ok) return response.json();
          navigate({ to: "/error/user-not-found" });
        });
    },
  });
};

export default useUserData;
