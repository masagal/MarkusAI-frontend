import { Skeleton, Stack } from "@mui/material";

export const InventoryLoading = () => {
  return (
    <Stack className="grid md:grid-cols-3 gap-10">
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="rectangular" height={200} />
    </Stack>
  );
};
