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
import { useNavigate } from "@tanstack/react-router";

const signedInLinks = [
  { text: "Home", link: "/" },
  { text: "CHAT", link: "/chat" },
  { text: "Requests", link: "/requests" },
  { text: "Inventory", link: "/inventory" },
  { text: "Order Status", link: "/order-status" },
];

export const NavContent = () => {
  const navigate = useNavigate();

  return (
    <List>
      {signedInLinks.map((value, index) => (
        <ListItem key={index}>
          <ListItemButton
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
