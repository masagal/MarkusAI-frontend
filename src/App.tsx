import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/route";

const router = createRouter({ routeTree });

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
