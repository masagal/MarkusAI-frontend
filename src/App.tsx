import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/route";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const router = createRouter({ routeTree });

const theme = createTheme({
  palette: {
    primary: {
      main: "#113264",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
