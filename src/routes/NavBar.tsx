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
  const signedInLinks = [
    { text: "Home", link: "/" },
    { text: "CHAT", link: "/chat" },
    { text: "Requests", link: "/requests" },
    { text: "Inventory", link: "/inventory" },
    { text: "Order Status", link: "/order-status" },
    { text: "About", link: "/about" },
  ];

  const signedOutLinks = [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
  ];

  const SignedInMenu = (
    <>
      <Account />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setOpen(!open)}>
          <List>
            {signedInLinks.map((value, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => {
                    navigate({ to: `/${value.link}` });
                  }}
                >
                  <ListItemText primary={value.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );

  const SignedOutMenu = (
    <List sx={{ display: "flex" }}>
      {signedOutLinks.map((value, index) => (
        <ListItem key={index}>
          <ListItemButton
            onClick={() => {
              navigate({ to: `/${value.link}` });
            }}
          >
            <ListItemText primary={value.text} />
          </ListItemButton>
        </ListItem>
      ))}

      <SignInButton>
        <ListItem>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText
              primary="Sign in"
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItemButton>
        </ListItem>
      </SignInButton>
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <SignedIn>
            <IconButton id="burger_menu" onClick={() => setOpen(true)}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
          </SignedIn>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Office Supply
          </Typography>

          <SignedOut>{SignedOutMenu}</SignedOut>
          <SignedIn>{SignedInMenu}</SignedIn>
        </Toolbar>
      </AppBar>

      <main className="mt-10 ml-5">
        <Outlet />
      </main>
    </>
  );
};
