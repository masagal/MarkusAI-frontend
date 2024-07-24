import { ReactNode } from "@tanstack/react-router";
import useUserData from "../ApiQueries/useUserData";

const IsAdmin = ({ children }: { children: ReactNode }) => {
  const { isPending, error, data: userData } = useUserData();

  if (isPending) return <p>eep</p>;
  if (error) return <p>oop</p>;
  console.log(userData!);
  if (userData.isAdmin) {
    return children;
  }
};

export default IsAdmin;
