import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { ChatGptIcon } from "../IconComponents/ChatGptIcon";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useUserData } from "../ApiQueries/useUserData";
import { useState } from "react";

const signedInLinks = [
  { text: "Home", link: "/", showToNonAdmins: true },
  { text: "CHAT", link: "/chat", showToNonAdmins: true },
  { text: "My Requests", link: "/requests", showToNonAdmins: true },
  { text: "Inventory", link: "/inventory", showToNonAdmins: false },
  { text: "Order Status", link: "/order-status", showToNonAdmins: false },
];

export const NavContent = () => {
  const navigate = useNavigate();
  const { data: userData } = useUserData();
  const [showAll, setShowAll] = useState(false);
  const { pathname } = useLocation();
  console.log("pathname is", pathname);

  if (userData) {
    if (userData.isAdmin && !showAll) {
      signedInLinks[2].text = "Requests";
      setShowAll(true);
    }
  }

  return (
    <List>
      {signedInLinks
        .filter((i) => showAll || i.showToNonAdmins)
        .map((value, index) => (
          <ListItem key={index}>
            <ListItemButton
              selected={pathname === value.link}
              onClick={() => {
                navigate({ to: `/${value.link}` });
              }}
            >
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <ChatGptIcon />}
                {index === 2 && <NoteAddIcon />}
                {index === 3 && <InventoryIcon />}
                {index === 4 && <LocalShippingIcon />}
                {index === 5 && <InfoIcon />}
              </ListItemIcon>
              <ListItemText primary={value.text} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
};
