import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import UserProfile from "../Components/UserProfile";
import { getCurrentUserID, getUser, getAllUsers, setCurrentUserID } from "../Helpers/Firebase";
import { User } from "../Helpers/User";

export default function UserProfilePage() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [users, setUsers] = useState<{ [id: string]: User }>({});
  useEffect(() => {
    getUser(getCurrentUserID()).then((data) => {
      setUser(data);
      setLoading(false);
    });
    getAllUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
      {loading && (
        <div className="text-center">
          <div className="spinner-grow" role="status"></div>
        </div>
      )}
      {!loading && (
        <div style={{ maxWidth: 500 }} className="container">
          <UserProfile user={user} />
          <FormControl fullWidth style={{ marginTop: "40px" }}>
            <InputLabel id="demo-simple-select-label">Current User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getCurrentUserID()}
              label="Current User"
              onChange={(selection) => {
                setCurrentUserID(selection.target.value);
                window.location.reload();
              }}
            >
              {Object.keys(users).map((key, index) => {
                const u = users[key];
                const name = u.firstName + " " + u.lastName;
                return (
                  <MenuItem value={key} key={index}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}
