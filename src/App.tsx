import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/route";

const router = createRouter({ routeTree });
import Inventory from "./Inventory";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <h1 className="text-3xl underline">hello is this working? yes it is</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Inventory />
      </SignedIn>
    </>
  );
}

export default App;
