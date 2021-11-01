import { db } from "./firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { User } from "./User";
import { Project } from "./Project";

export function getCurrentUserID(): string {
  var currentUser = localStorage.getItem("userid");
  if (currentUser === null) {
    currentUser = "2402eyybBfaxGDbfhOfi";
    setCurrentUserID(currentUser);
  }
  return currentUser;
}

export function setCurrentUserID(id: string) {
  localStorage.setItem("userid", id);
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

export const getAllUsers = function (): Promise<{ [id: string]: User }> {
  return new Promise<{ [id: string]: User }>((resolve, reject) => {
    const usersRef = collection(db, "users");
    var out: { [id: string]: User } = {};
    getDocs(usersRef)
      .then((data) => {
        data.forEach((doc) => (out[doc.id] = doc.data() as User));
        resolve(out);
      })
      .catch((error) => reject(error));
  });
};

export const getUserFeed = function (userID: string): Promise<Project[]> {
  return new Promise<Project[]>((resolve, reject) => {
    fetch("https://us-central1-bgn-hack21-7006.cloudfunctions.net/user/" + userID).then((data) =>
      data
        .json()
        .then((projects) => {
          resolve(projects);
          projects.forEach((p: any) => console.log(p.id));
        })
        .catch((error) => reject(error))
    );
  });
};

export const likeProject = function (userID: string, projectID: string): Promise<Boolean> {
  return new Promise<Boolean>((resolve, reject) => {
    fetch("https://us-central1-bgn-hack21-7006.cloudfunctions.net/user/like/" + userID + "/" + projectID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((_) => resolve(true))
      .catch((_) => reject(false));
  });
};


export const dislikeProject = function (userID: string, projectID: string): Promise<Boolean> {
  return new Promise<Boolean>((resolve, reject) => {
    fetch("https://us-central1-bgn-hack21-7006.cloudfunctions.net/user/dislike/" + userID + "/" + projectID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((_) => resolve(true))
      .catch((_) => reject(false));
  });
};

