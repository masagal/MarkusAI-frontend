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

const apiHost = import.meta.env.VITE_API_HOST;
const inviteEndpoint = "/invite?token=";

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
      <Typography variant="h5" className="mb-8 pt-5 font-bold text-[#2c3e50]">
        All Users:
      </Typography>

      <div className="overflow-x-auto text-nowrap sm:text-wrap">
        <table className="sm:inline-table flex flex-row w-full">
          <thead>
            {listUsers.length != 0 &&
              listUsers.map((user, index) => (
                <tr
                  className={`bg-[#5eb1ef]/[50%] flex flex-col sm:table-row mb-6 ${
                    index == 0 ? "sm:flex" : "sm:hidden"
                  }`}
                  key={index}
                >
                  <th className="py-3 px-5 text-left">User ID</th>
                  <th className="py-3 px-5 text-left">Name</th>
                  <th className="py-3 px-5 text-left">Email</th>
                  <th className="py-3 px-5 text-left">Account</th>
                  <th className="py-3 px-5 text-left">Invitation</th>
                </tr>
              ))}
          </thead>
          <tbody>
            {listUsers.length != 0 &&
              listUsers.map((user, index) => (
                <tr className="flex flex-col sm:table-row mb-6" key={index}>
                  <td className="hover:bg-[#222E3A]/[6%] py-3 px-5 sm:text-center">
                    {user.id}
                  </td>
                  <td className="hover:bg-[#222E3A]/[6%] py-3 px-5">
                    {user.name}
                  </td>
                  <td className="hover:bg-[#222E3A]/[6%] py-3 px-5">
                    {user.email}
                  </td>
                  <td className="hover:bg-[#222E3A]/[6%] py-3 px-5">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="hover:bg-[#222E3A]/[6%] py-3 px-5">
                    {user.invitationToken
                      ? apiHost + inviteEndpoint + user.invitationToken
                      : "Claimed account"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
