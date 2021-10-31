import * as React from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {getProject} from "../Helpers/Firebase";
import {Project} from "../Helpers/Project";
import {Button, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import {User} from "../Helpers/User";
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    const user: User = props.user;
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    return (
        <Stack spacing={2} direction="column">
            <Stack style={{textAlign: "center"}}>
                <Typography variant="h1">{project.title}</Typography>
            </Stack>
            <Accordion style={{paddingTop: '25px'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Description
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6" component="div">{project.description}</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{paddingTop: '25px'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Why Join Us
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6" component="div">{project.why_join}</Typography>
                </AccordionDetails>
            </Accordion>
            {/*<Card sx={{minWidth: 275}} variant="outlined">*/}
            {/*    <CardContent>*/}
            {/*        <Typography variant="h4" color="text.secondary" gutterBottom>*/}
            {/*            Description*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h6" component="div">{project.description}</Typography>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
            <Card sx={{minWidth: 275}} variant="outlined">
                <CardContent>
                    <Typography variant="h4" color="text.secondary" gutterBottom>
                        Hours/Week
                    </Typography>
                    <Grid container spacing={0} style={{textAlign: "center"}}>
                        <Grid item xs={7}>
                            <Stack sx={{paddingTop: '25px'}}>
                                <Typography variant="h1">{project.hours}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Don't worry this is just an estimate of hours required :)
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <Typography variant="h6" color="text.secondary" component="div">As a <b>Contributor</b></Typography>
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
                              style={{textAlign: "center"}}
                              spacing={2}>
                            {project.languages.map((language) => {
                                return <Grid item xs={4}>{language}</Grid>
                            })}
                            <Grid item xs={4}>
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
                        <Grid container
                              style={{textAlign: "center"}}
                              spacing={2}>
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
                <CardContent>
                    <Typography variant="h4" color="text.secondary">Interested Users</Typography>
                    <Typography variant="h1">{project.likedBy}</Typography>
                    <Grid container>
                        <Grid item xs={12}
                              style={{textAlign: "center"}}>
                            <Typography variant="body2">Hint: View profiles, add members, spread the knowledge.</Typography>
                        </Grid>
                    </Grid>

                </CardContent>

            </Card>
        </Stack>
    )
}
