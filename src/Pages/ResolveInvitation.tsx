import { SignInButton, SignedOut, SignedIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useInvitation } from "../ApiQueries/useUserData";
import { Navigate, useNavigate, useSearch } from "@tanstack/react-router";
import { CircularProgress, Typography } from "@mui/material";

const ResolveInvitation = () => {
  const auth = useAuth();
  const inviteMutation = useInvitation();

  const search = useSearch({ strict: false });
  const inviteToken = search.token;
  if (auth.isSignedIn && inviteToken && !inviteMutation.submittedAt) {
    inviteMutation.mutate(inviteToken);
  }
  if (inviteMutation.isSuccess) {
    return <Navigate to="/"></Navigate>;
  }
  if (!inviteToken) {
    return (
      <Typography>
        This URL is missing the invite token and is thus invalid.
      </Typography>
    );
  }
  return (
    <>
      <Typography>
        <SignedOut>
          <p>Please sign in to resolve this invite.</p>
          <SignInButton>Sign in</SignInButton>
        </SignedOut>
        <SignedIn>
          {inviteMutation.isPending && (
            <>
              <p>Processing...</p>
              <CircularProgress />
            </>
          )}
          {inviteMutation.isError && (
            <>
              <p>Something went wrong when resolving this invite.</p>
              <p>Perhaps you have already used it?</p>
            </>
          )}
        </SignedIn>
      </Typography>
    </>
  );
};

export default ResolveInvitation;
