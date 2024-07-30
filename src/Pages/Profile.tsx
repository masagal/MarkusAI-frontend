import { useUserData } from "../ApiQueries/useUserData";
import IsAdmin from "../Components/IsAdmin";
import {
  Typography,
  Stack,
  Divider,
  Badge,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

export const Profile = () => {
  const { isPending, error, data: userData } = useUserData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFile = e.target.files;
    if (chosenFile != null) {
      console.log(URL.createObjectURL(chosenFile[0]));
    }
  };

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Typography
        variant="h3"
        className="mb-8 text-slate-600 pb-8 pt-5"
        align="center"
      >
        My Profile
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 3, md: 7 }}
        alignItems="center"
        justifyContent="center"
      >
        <div className="flex flex-col">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton aria-label="upload picture">
                <label htmlFor="choose-pic" className="cursor-pointer">
                  <input
                    id="choose-pic"
                    name="choose-pic"
                    type="file"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <CameraAlt fontSize="large"></CameraAlt>
                </label>
              </IconButton>
            }
          >
            {!isPending && !error && userData && (
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={userData.imageUrl}
              ></Avatar>
            )}
            {(isPending || error) && (
              <Avatar sx={{ width: 200, height: 200 }}></Avatar>
            )}
          </Badge>
        </div>
        <Stack spacing={4} justifyContent="center">
          <IsAdmin>
            <Typography variant="body1">
              <strong>Account type:</strong> Admin
            </Typography>
          </IsAdmin>
          <Typography variant="body1">
            <strong>Username:</strong> {userData.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {userData.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> 0708-927 852
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
