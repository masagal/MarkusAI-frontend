import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import MenuIcon from "@mui/icons-material/Menu";
import { Account } from "../Components/Account";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const NavBar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const linkText = [
    { text: "Home", link: "/" },
    { text: "CHAT", link: "/chat" },
    { text: "Requests", link: "/requests" },
    { text: "Inventory", link: "/inventory" },
    { text: "Order Status", link: "/order-status" },
    { text: "About", link: "/about" },
  ];

  const ToggleLeftMenu = (
    <Box sx={{ width: 250 }} onClick={() => setOpen(!open)}>
      <List>
        {linkText.map((value, index) => (
          <ListItem key={index}>
            <ListItemButton>
              <ListItemText
                primary={value.text}
                onClick={() => {
                  navigate({ to: `/${value.link}` });
                  console.log("hey");
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <SignedIn>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
          </SignedIn>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Office Supply
          </Typography>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Account />
            <Drawer open={open} onClose={() => setOpen(false)}>
              {ToggleLeftMenu}
            </Drawer>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <main className="mt-10 ml-5">
        <Outlet />
      </main>
    </>
  );
};
