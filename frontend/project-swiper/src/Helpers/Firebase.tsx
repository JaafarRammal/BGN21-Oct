import { db } from "./firebase.config";
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { User } from "./User";
import { Project } from "./Project";

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

export const getContributors = function (contributor_ids: string[]): Promise<User[]> {
  return new Promise<User[]>( (resolve, reject) => {
    // const contributors: User[] = [];
    const q = query(collection(db, "users"),
        where('ownedProjects', 'in', contributor_ids));
    getDocs(q).then((querySnapshot) => {
      // querySnapshot.forEach((doc) => {
      //   console.log(doc);
      //   // doc.data() is never undefined for query doc snapshots
      //   contributors.push(doc.data() as User);
      // });
      const contributors: User[] = querySnapshot.docs.map((doc) => {
        return doc.data() as User;
      });
      resolve(contributors);
    }).catch((error) => reject(error));
  })
}
