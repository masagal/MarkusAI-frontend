import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/route";
import Inventory from "./Inventory";
import RequestsForm from "./Components/RequestsForm";

const router = createRouter({ routeTree });

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
