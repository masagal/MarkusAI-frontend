import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import ludvig from '../assets/footer-image-ludvig copy.png';
import mathangi from '../assets/Footer-image-mathangi copy.jpeg';
import simon from '../assets/footer-image-simon copy.jpeg';

export const Footer = () => {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, mt: 'auto', backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar alt="Ludvig" src={ludvig} />
            <Avatar alt="Mathangi" src={mathangi} />
            <Avatar alt="Simon" src={simon} />
          </Box>
          <Typography variant="body1" color="inherit" sx={{ ml: 2 }}>
            MarkusAI &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
