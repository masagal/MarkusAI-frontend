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
import SearchBar from "../Components/SearchBar";
const apiHost = import.meta.env.MODE=="development"?"localhost:5173":"https://markusai.tolpuddle.tech";
const inviteEndpoint = "/invite?token=";

export const Users = () => {
  const { getToken } = useAuth();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const [newUserIsUser, setNewUserIsUser] = useState(false);
  const addUser = useMutateUsers();
  const [listUsers, setListUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const postNewUser = () => {
    console.log(user);
    console.log(email);
    console.log(newUserIsAdmin);
    addUser.mutate({ name: user, email: email, isAdmin: newUserIsAdmin });
  };

  useEffect(() => {
    getAllUsers(getToken).then(setListUsers);
  }, [getToken]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = listUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <SearchBar
        label="Search Users"
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <Typography variant="h5" className="mb-8 pt-5 font-bold text-[#2c3e50]">
        All Users:
      </Typography>

      <div className="overflow-x-auto text-nowrap sm:text-wrap">
        <Typography>
          <table className="sm:inline-table flex flex-row w-full">
            <thead>
              <tr className="bg-primary flex flex-col sm:table-row mb-6">
                <th className="py-3 px-5 text-left">User ID</th>
                <th className="py-3 px-5 text-left">Name</th>
                <th className="py-3 px-5 text-left">Email</th>
                <th className="py-3 px-5 text-left">Account</th>
                <th className="py-3 px-5 text-left">Invitation</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
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
        </Typography>
      </div>
    </>
  );
};
