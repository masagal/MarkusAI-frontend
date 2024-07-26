import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Footer = () => {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, mt: 'auto', backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Typography variant="body1" color="inherit">
            MarkusAI &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
