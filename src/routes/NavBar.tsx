import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import logo from "../assets/markusai-logo.svg";
import { Footer } from "../Components/Footer";
import { SignedOutMenu } from "../Components/SignedOutMenu";
import { SignedInMenu } from "../Components/SignedInMenu";
import { Tab } from "@mui/material";
import { TabList, TabContext } from "@mui/lab";
import { useNavigate } from "@tanstack/react-router";

export const NavBar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  const tabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    if (newValue == "1") {
      navigate({ to: `/` });
    } else if (newValue == "2") {
      navigate({ to: `/about` });
    }
  };

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

      <SignedOut>
        <TabContext value={tabValue}>
          <TabList
            onChange={tabChange}
            variant="fullWidth"
            className="sm:hidden"
          >
            <Tab label="Home" value="1"></Tab>
            <Tab label="About" value="2"></Tab>
          </TabList>
        </TabContext>
      </SignedOut>

      <main className="mt-10 ml-5">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
