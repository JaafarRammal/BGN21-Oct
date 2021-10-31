import { Button } from "@mui/material";
import { useState } from "react";
import { getCurrentUserID, getUser } from "../Helpers/Firebase";
import { User } from "../Helpers/User";

export default function MyProjectsPage() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(false);

  getUser(getCurrentUserID()).then((data) => setUser(data));

  return (
    <div>
      <Button
        onClick={() => {
          
        }}
      >Hello</Button>
      First name: {user?.firstName}
      Last name: {user?.secondName}
    </div>
  );
}
