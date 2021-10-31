import { useState } from "react";
import { getCurrentUserID, getProject, getUser } from "../Helpers/Firebase";
import { Project } from "../Helpers/Project";

export default function MyProjectsPage() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [ownedProjects, setOwnedProjects] = useState<Project[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<Project[]>([]);
  const [likedProjects, setLikedProjects] = useState<Project[]>([]);

  getUser(getCurrentUserID()).then((data) => {
    const ownedArray: Project[] = [];
    const joinedArray: Project[] = [];
    const likedArray: Project[] = [];
    const promises: Promise<any>[] = [];
    data.ownedProjects.forEach((id) => {
      promises.push(getProject(id).then((project) => ownedArray.push(project)));
    });
    data.joinedProjects.forEach((id) => {
      promises.push(getProject(id).then((project) => joinedArray.push(project)));
    });
    data.likedProjects.forEach((id) => {
      promises.push(getProject(id).then((project) => likedArray.push(project)));
    });

    Promise.all(promises).then((_) => {
      setOwnedProjects(ownedArray);
      setLikedProjects(likedArray);
      setJoinedProjects(joinedArray);
      setLoading(false);
    });
  });

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <div>{ownedProjects.length}</div> <div>{likedProjects.length}</div> <div>{joinedProjects.length}</div>
        </div>
      )}
    </div>
  );
}
