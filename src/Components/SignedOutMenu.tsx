import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";

const signedOutLinks = [
  { text: "Home", link: "/" },
  { text: "About", link: "/about" },
];
export const SignedOutMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <List className="hidden sm:flex">
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
      </List>
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
    </div>
  );
};
