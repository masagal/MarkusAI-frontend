import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import logo from "../assets/markusai-logo.svg";
import { Footer } from "../Components/Footer";
import { SignedOutMenu } from "../Components/SignedOutMenu";
import { SignedInMenu } from "../Components/SignedInMenu";
import { NavContent } from "../Components/NavContent";

const drawerWidth = 300;

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar>
            <SignedIn>
              <IconButton
                id="burger_menu"
                onClick={() => setOpen(true)}
                className="lg:hidden"
              >
                <MenuIcon style={{ color: "#fff" }} />
              </IconButton>
            </SignedIn>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src={logo} className="max-h-12 my-4" />
            </Typography>

            <SignedOut>
              <SignedOutMenu />
            </SignedOut>
            <SignedIn>
              <SignedInMenu open={open} setOpen={setOpen} />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <SignedIn>
          <Drawer
            className="hidden lg:block"
            variant="permanent"
            sx={{
              width: drawerWidth,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar className="mt-10" />
            <NavContent />
          </Drawer>
        </SignedIn>

        <Box component="main" sx={{ p: 5 }} className="w-full">
          <Toolbar />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </>
  );
};
