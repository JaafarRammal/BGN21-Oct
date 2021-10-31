import * as React from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {getProject} from "../Helpers/Firebase";
import {Project} from "../Helpers/Project";
import {Button, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import {User} from "../Helpers/User";
import AddIcon from '@mui/icons-material/Add';

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
    // Pull from DB
    const contributors = [
        {firstName: "Hello", lastName: "World"},
        {firstName: "Sam", lastName: "Smith"},
        {firstName: "Hello", lastName: "World"},
        {firstName: "Sam", lastName: "Smith"},
        {firstName: "Hello", lastName: "World"},
        {firstName: "Sam", lastName: "Smith"},
        {firstName: "Hello", lastName: "World"},
        {firstName: "Sam", lastName: "Smith"}
    ];

    return (
        <Stack spacing={2} direction="column">
            <Stack>
                <Typography variant="h1">{project.title}</Typography>
            </Stack>
            <Card sx={{minWidth: 275}} variant="outlined">
                <CardContent>
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Description
                    </Typography>
                    <Typography variant="h6" component="div">{project.description}</Typography>
                </CardContent>
            </Card>
            <Card sx={{minWidth: 275}} variant="outlined">
                <CardContent>
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Hours/Week
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={7}>
                            <Stack sx={{padding: '50px'}}>
                                <Typography variant="h1">{project.hours}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Don't worry this is just an estimate of hours required :)
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
            <Card sx={{minWidth: 275}} variant="outlined">
                <CardContent>
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Programming Languages
                    </Typography>
                    <Stack>
                        <Grid container
                              spacing={2}>
                            {project.languages.map((language) => {
                                return <Grid item xs={4}>{language}</Grid>
                            })}
                            <Grid>
                                <Button>
                                    <AddIcon></AddIcon>
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
            <Card sx={{minWidth: 275}} variant="outlined">
                <CardContent>
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Tags
                    </Typography>
                    <Stack>
                        <Grid container spacing={2}>
                            {project.tags.map((tag) => {
                                return <Grid item xs={3}>{tag}</Grid>
                            })}
                            <Grid item xs={3}>
                                <Button>
                                    <AddIcon></AddIcon>
                                </Button>
                            </Grid>

                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
            <Card sx={{minWidth: 275}} variant="outlined">
                <Typography variant="h5">Interested Users: {project.likedBy}</Typography>
                <Typography variant="h6">Hint: Why not spread the knowledge and add members!</Typography>
            </Card>
        </Stack>
    )
}
