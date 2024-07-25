import useUserData from "../ApiQueries/useUserData";
import IsAdmin from "../Components/IsAdmin";

export const Profile = () => {
  const { isPending, error, data: userData } = useUserData();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <p>Profile</p>
      <p>you are logged in as {userData.name} </p>
      <IsAdmin>
        <p>You are an admin user.</p>
      </IsAdmin>
    </>
  );
};
