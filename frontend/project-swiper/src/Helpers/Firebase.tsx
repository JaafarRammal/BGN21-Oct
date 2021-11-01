import { db } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { User } from "./User";
import { Project } from "./Project";

// function to return the user ID logged in
// hardcoded for now
export function getCurrentUserID(): string {
  return "p4lQAAutGvrjxxayXq2K";
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

export const getProject = function (projectID: string): Promise<Project> {
  return new Promise<Project>((resolve, reject) => {
    const projectRef = doc(db, "projects", projectID);
    getDoc(projectRef)
      .then((data) => {
        data.exists() ? resolve(data.data() as Project) : reject("Record does not exist");
      })
      .catch((error) => reject(error));
  });
};

export const getUserFeed = function (userID: string): Promise<Project[]> {
  return new Promise<Project[]>((resolve, reject) => {
    fetch("https://us-central1-bgn-hack21-7006.cloudfunctions.net/user/" + userID).then((data) => console.log(data));
  });
};
