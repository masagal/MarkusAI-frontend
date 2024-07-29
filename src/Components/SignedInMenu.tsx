import { Drawer, Box } from "@mui/material";
import { Account } from "./Account";
import { NavContent } from "./NavContent";

export const SignedInMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
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
