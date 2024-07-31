import { SignInButton, SignedOut, SignedIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useInvitation } from "../ApiQueries/useUserData";
import { useSearch } from "@tanstack/react-router";

const ResolveInvitation = () => {
  const auth = useAuth();
  const inviteMutation = useInvitation();

  const search = useSearch({ strict: false });
  const inviteToken = search.token;
  if (auth.isSignedIn && inviteToken && !inviteMutation.submittedAt) {
    inviteMutation.mutate(inviteToken);
  }
  if (inviteMutation.isSuccess) {
    return "yeah done";
  }
  if (!inviteToken) {
    return "Dont";
  }
  return (
    <>
      <SignedOut>
        <p>Please sign in to resolve this invite.</p>
        <SignInButton>Sign in</SignInButton>
      </SignedOut>
      <SignedIn>
        <p>Processing...</p>
      </SignedIn>
    </>
  );
};

export default ResolveInvitation;
