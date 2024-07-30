import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SignInButton } from "@clerk/clerk-react";

export const SignedOutMenu = () => {
  return (
    <div className="flex">
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
