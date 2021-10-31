import * as React from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {getContributors, getProject} from "../Helpers/Firebase";
import {Project} from "../Helpers/Project";
import {Container, Divider, Stack, Typography} from "@mui/material";
import {User} from "../Helpers/User";

export default function ProjectDetailsPage() {
    const {projectid} = useParams<any>();
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

function ContributorsView(props: any) {
    const contributors: User[] = props.contributors;

    return (
        <div>
            {
                contributors.map((contributor) => {
                    return <div>{contributor.firstName}</div>
                })
            }
        </div>
    )
}

function ProjectView(props: any) {
    const project: Project = props.project;
    const [contributors, setContributors] = useState<User[]>();

    getContributors(project.contributor_ids)
        .then((contributors) => {
            console.log(contributors);
            setContributors(contributors);
        });

    return (
        <Stack spacing={2} direction="column" divider={<Divider orientation="vertical" flexItem/>}>
            <Container>
                <Typography variant="h1">{project.title}</Typography>
            </Container>
            <Container>
                <ContributorsView contributors={contributors}/>
            </Container>
        </Stack>
    )
}
