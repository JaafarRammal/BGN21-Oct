import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import SwipeableCard from "../Components/SwipeableCard";
import { getCurrentUserID, getUserFeed } from "../Helpers/Firebase";
import { Project } from "../Helpers/Project";

export default function ExplorePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    getUserFeed(getCurrentUserID()).then((projects) => {
      setProjects(projects);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      {!loading && (
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
          {projects.map((project, index) => (
            <SwipeableCard project={project} key={index} />
          ))}
          {projects.length === 0 && <div className="secondary">No projects to display!</div>}
        </Stack>
      )}
      {loading && (
        <div className="text-center">
          <div className="spinner-grow" role="status"></div>
        </div>
      )}
    </div>
  );
}
