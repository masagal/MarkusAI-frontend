import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMutateUsers } from "../ApiQueries/useUserData";
import { getAllUsers } from "../ApiQueries/useUserData";
import { useAuth } from "@clerk/clerk-react";
import { UserData } from "../utils/types";

export const Users = () => {
  const { getToken } = useAuth();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const [newUserIsUser, setNewUserIsUser] = useState(false);
  const addUser = useMutateUsers();
  const [listUsers, setListUsers] = useState<UserData[]>([]);
  const postNewUser = () => {
    console.log(user);
    console.log(email);
    console.log(newUserIsAdmin);
    addUser.mutate({ name: user, email: email, isAdmin: newUserIsAdmin });
  };
  useEffect(() => {
    getAllUsers(getToken).then(setListUsers);
  }, []);
  return (
    <>
      <div className="mb-4 flex flex-col gap-5">
        <Typography variant="h3" className="mb-8 font-bold text-[#2c3e50]">
          Users
        </Typography>
        <TextField
          label="Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup
            row
            aria-label="role"
            name="role"
            value={newUserIsAdmin ? "admin" : newUserIsUser ? "user" : ""}
            onChange={(e) => {
              const role = e.target.value;
              setNewUserIsAdmin(role === "admin");
              setNewUserIsUser(role === "user");
            }}
          >
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="Employee"
            />
          </RadioGroup>
        </FormControl>
        <div className="flex space-x-2 mt-2">
          <Button variant="contained" color="primary" onClick={postNewUser}>
            Add User
          </Button>
        </div>
      </div>
      <ul className="list-none p-0">
        {listUsers.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
          >
            <Typography variant="body1" className="mb-8">
              {user.name}
            </Typography>
            <Typography variant="body1" className="mb-8">
              {user.email}
            </Typography>
            <Typography variant="body1" className="mb-8">
              {user.invitationToken}
            </Typography>
          </li>
        ))}
      </ul>
    </>
  );
};
