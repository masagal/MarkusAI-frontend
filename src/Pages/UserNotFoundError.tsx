const UserNotFoundError = () => {
  return (
    <>
      <h1>Boy, this is awkward.</h1>
      <p>We're not sure we know who you are.</p>
      <p>
        You are clearly a person, since you have managed to log in using Clerk.
      </p>
      <p>
        But our backend does not recognize you. You do not have user data with
        us.
      </p>
      <p>
        I am afraid there is no way for our relationship to recover from this.
      </p>
      <p>
        Unless you find some way to get yourself a user set up in the system.
      </p>
    </>
  );
};

export default UserNotFoundError;
