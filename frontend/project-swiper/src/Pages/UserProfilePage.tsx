import { useState } from "react";
import UserProfile from "../Components/UserProfile";
import { getCurrentUserID, getUser } from "../Helpers/Firebase";
import { User } from "../Helpers/User";

export default function UserProfilePage() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(true);

  getUser(getCurrentUserID()).then((data) => {
    setUser(data);
    setLoading(false);
  });

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {/* TODO: replace by spinner for loading */}
      {loading && (
        <div className="text-center">
          <div className="spinner-grow" role="status"></div>
        </div>
      )}
      {!loading && <UserProfile user={user} />}
    </div>
  );
}
