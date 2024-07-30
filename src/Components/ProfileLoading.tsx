import { Skeleton, Stack } from "@mui/material";

export const ProfileLoading = () => {
  return (
    <Stack className="flex flex-row justify-center gap-10">
      <Skeleton variant="circular" width={200} height={200} />
      <Skeleton variant="rectangular" width={300} height={200} />
    </Stack>
  );
};
