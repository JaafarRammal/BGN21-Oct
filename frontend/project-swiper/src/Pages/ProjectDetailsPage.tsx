import { useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../Helpers/Firebase";
import { Project } from "../Helpers/Project";

export default function ProjectDetailsPage() {
  const { projectid } = useParams<any>();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<Boolean>(true);

  getProject(projectid).then((data) => {
    setProject(data);
    setLoading(false);
  });

  return (
    <div>
      {/* TODO: replace by spinner for loading */}
      {loading && <div>Loading</div>}
      {!loading && <ProjectView project={project}/>}
    </div>
  );
}

function ProjectView(props: any) {
  const project: Project = props.project;
  return <div>{project.description}</div>
}
