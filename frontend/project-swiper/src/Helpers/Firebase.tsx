import { db } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { User } from "./User";

// function to return the user ID logged in
// hardcoded for now
export function getCurrentUserID(): string {
  return "0KOlZSoDTsnHVQUAfcwV";
}

export const getUser = function (userID: string): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    const userRef = doc(db, "users", userID);
    getDoc(userRef)
      .then((data) => {
        data.exists() ? resolve(data.data() as User) : reject("Record does not exist");
      })
      .catch((error) => reject(error));
  });
};
