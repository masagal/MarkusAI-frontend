import { Skeleton, Stack } from "@mui/material";

export const SkeletonLoading = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={200} />
    </Stack>
  );
};
