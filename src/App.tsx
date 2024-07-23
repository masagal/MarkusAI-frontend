import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/route";
import Inventory from "./Inventory";
import RequestsForm from "./Components/RequestsForm";

const router = createRouter({ routeTree });

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
        <RequestsForm />
      </SignedIn>
    </>
  );
}

export default App;
