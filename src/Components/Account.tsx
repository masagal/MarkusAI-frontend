import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useClerk } from "@clerk/clerk-react";

export const Account = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const goToProfile = () => {
    setAnchor(null);
    console.log("yo go");
    navigate({ to: "/profile" });
  };

  return (
    <>
      <Box>
        <Tooltip title="Account">
          <IconButton onClick={handleClick}>
            <Avatar>Me</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={goToProfile}>My Profile</MenuItem>
        <MenuItem onClick={() => signOut({ redirectUrl: "/" })}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
