import { useState } from "react";
import { getCurrentUserID, getProject, getUser } from "../Helpers/Firebase";
import { Project } from "../Helpers/Project";
import { User } from "../Helpers/User";

export default function MyProjectsPage() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [ownedProjects, setOwnedProjects] = useState<Project[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<Project[]>([]);
  const [likedProjects, setLikedProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User>();

  function updateArray(projectids: string[], tempArray: Project[], setState: React.Dispatch<React.SetStateAction<Project[]>>, index: number = 0) {
    if (index == projectids.length) setState(tempArray);
    getProject(projectids[index]).then((project) => {
      tempArray.push(project);
      updateArray(projectids, tempArray, setState, index + 1);
    });
  }

  getUser(getCurrentUserID()).then((data) => {
    setUser(data);
    const likedProjectsIds = user?.likedProjects ?? [];
    const ownedProjectsIds = user?.ownedProjects ?? [];
    const joinedProjectsIds = user?.joinedProjects ?? [];

    const likedProjectsArray: Project[] = [];
    const ownedProjectsArray: Project[] = [];
    const joinedProjectsArray: Project[] = [];

    updateArray(likedProjectsIds, likedProjectsArray, setLikedProjects);
    updateArray(ownedProjectsIds, ownedProjectsArray, setOwnedProjects);
    updateArray(joinedProjectsIds, joinedProjectsArray, setJoinedProjects);
  });

  return (
    <div>
      <div>{ownedProjects}</div>
      <div>{likedProjects}</div>
      <div>{joinedProjects}</div>
    </div>
  );
}
