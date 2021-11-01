import { useEffect, useState } from "react";
import { getCurrentUserID, getProject, getUser } from "../Helpers/Firebase";
import { Project } from "../Helpers/Project";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProjectCard from "../Components/ProjectCard";

export default function MyProjectsPage() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [ownedProjects, setOwnedProjects] = useState<{ [id: string]: Project }>({});
  const [joinedProjects, setJoinedProjects] = useState<{ [id: string]: Project }>({});
  const [likedProjects, setLikedProjects] = useState<{ [id: string]: Project }>({});

  useEffect(() => {
    getUser(getCurrentUserID()).then((data) => {
      const ownedArray: { [id: string]: Project } = {};
      const joinedArray: { [id: string]: Project } = {};
      const likedArray: { [id: string]: Project } = {};
      const promises: Promise<any>[] = [];
      data.ownedProjects.forEach((id) => {
        promises.push(getProject(id).then((project) => (ownedArray[id] = project)));
      });
      data.joinedProjects.forEach((id) => {
        promises.push(getProject(id).then((project) => (joinedArray[id] = project)));
      });
      data.likedProjects.forEach((id) => {
        promises.push(getProject(id).then((project) => (likedArray[id] = project)));
      });

      Promise.all(promises).then((_) => {
        setOwnedProjects(ownedArray);
        setLikedProjects(likedArray);
        setJoinedProjects(joinedArray);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div>
        <ProjectsCollapse projects={ownedProjects} title="Owned" loading={loading} />
        <ProjectsCollapse projects={joinedProjects} title="Joined" loading={loading} />
        <ProjectsCollapse projects={likedProjects} title="Liked" loading={loading} />
      </div>
    </div>
  );
}

function ProjectsCollapse(props: any) {
  const projects: { [id: string]: Project } = props.projects;
  const title: string = props.title;
  const loading: Boolean = props.loading;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography sx={{ width: "33%", flexShrink: 0 }}>{title}</Typography>
        {!loading && <Typography sx={{ width: "33%", flexShrink: 0, color: "text.secondary" }}>{Object.keys(projects).length} project(s)</Typography>}
        {loading && (
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <div className="spinner-grow spinner-grow-sm" role="status"></div>
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <div className="row">
          {Object.keys(projects).map((key, index) => {
            const project = projects[key];
            return (
              <div className="col-lg-6">
                <ProjectCard project={project} key={index} projectid={key} />
              </div>
            );
          })}
          {Object.keys(projects).length === 0 && <div className="col-lg-6 text-secondary">No projects to show!</div>}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
