import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/route";

const router = createRouter({ routeTree });

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <SignOutButton />
      </SignedIn>
    </>
  );
}

export default App;
