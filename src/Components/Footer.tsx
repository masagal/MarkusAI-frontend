import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import ludvig from "../assets/footer-image-ludvig copy.png";
import mathangi from "../assets/Footer-image-mathangi copy.jpeg";
import simon from "../assets/footer-image-simon copy.jpeg";

export const Footer = () => {
  return (
    <AppBar className="sticky mt-16 lg:pl-72">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={() => window.open("https://github.com/Junotas")}
            >
              <Avatar alt="Ludvig" src={ludvig} />
            </IconButton>
            <IconButton
              onClick={() => window.open("https://github.com/math121")}
            >
              <Avatar alt="Mathangi" src={mathangi} />
            </IconButton>
            <IconButton
              onClick={() => window.open("https://github.com/sighmoan")}
            >
              <Avatar alt="Simon" src={simon} />
            </IconButton>
          </Box>
          <Typography variant="body1" color="inherit">
            MarkusAI &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
