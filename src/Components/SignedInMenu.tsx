import { Drawer, Box } from "@mui/material";
import { Account } from "./Account";
import { NavContent } from "./NavContent";
import { useUserData } from "../ApiQueries/useUserData";

export const SignedInMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const { isPending, error } = useUserData();
  if (isPending || error) return <></>;

  return (
    <>
      <Account />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        className="lg:hidden"
        sx={{ zIndex: 1202 }}
      >
        <Box sx={{ width: 250 }} onClick={() => setOpen(!open)}>
          <NavContent />
        </Box>
      </Drawer>
    </>
  );
};
