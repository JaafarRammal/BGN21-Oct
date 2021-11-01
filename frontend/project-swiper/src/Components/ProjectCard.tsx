import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { deepOrange, deepPurple, red } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AppBar, Button, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Toolbar } from "@mui/material";
import logo from "../Assets/logo.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Project } from "../Helpers/Project";

export default function ProjectCard(props: any) {
  const project: Project = props.project;
  const popover: Boolean = props.popover;
  const projectid: string = props.projectid;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (popover) setOpen(true);
    else window.location.href = "/projectdetails/" + projectid;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Tags = project.tags.map((tag: string) => {
    return <Chip size="small" label={tag} color="primary" />;
  });

  const Languages = project.languages.map((language: string) => {
    return <Chip size="small" label={language} variant="outlined" color="secondary" />;
  });

  const registerInterest = () => {
    console.log("RegisterInterest: ", project.title);
    // Do some animation or add to saved project list
    handleClose();
  };

  // const Contributors = project.contributor_ids.map((contributor: any, index: number) => {
  //     // TODO fix this link
  //     const link = `/user/${contributor.id}`
  //     if (index === 0){
  //         return (
  //                 <Button href={link}>
  //                     <Avatar sx={{ bgcolor: deepOrange[500] }}>
  //                         {contributor.firstName.charAt(0)}.{contributor.lastName.charAt(0)}
  //                     </Avatar>
  //                 </Button>
  //         )
  //     }
  //     return (
  //         <Button href={link}>
  //             <Avatar sx={{ bgcolor: deepPurple[500] }}>
  //                 {contributor.firstName.charAt(0)}.{contributor.lastName.charAt(0)}
  //             </Avatar>
  //         </Button>
  //     );
  // })

  return (
    <div>
      <Card sx={{ width: window.innerWidth - 80, maxWidth: 500 }} onClick={handleClickOpen}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={project.title}
          subheader={project.date}
        />
        <CardMedia component="img" height="194" image={logo} style={{ maxWidth: "500px" }} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
          <Stack direction="row" spacing={0.5}>
            {Languages}
            {Tags}
          </Stack>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => handleClose()}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Project Details
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{project.description}</DialogContentText>
          <Stack direction="column">
            {/* <Typography variant="h6">Contributors</Typography> */}
            {/* <Stack style={{overflow: "auto"}} direction="row">{Contributors}</Stack> */}
            <Typography variant="h6">Learning Outcomes</Typography>
            <List>
              {project.learning_outcomes.map((learning_outcome: string, index: number) => {
                return (
                  <ListItem disablePadding>
                    <ListItemIcon>{index + 1}</ListItemIcon>
                    <ListItemText primary={learning_outcome} />
                  </ListItem>
                );
              })}
            </List>
            <Typography variant="h6">Why Join Us?</Typography>
            <Typography>{project.why_join}</Typography>
            {/*<Typography variant="h6">Languages & Tech</Typography>*/}
            <Divider style={{ padding: "5px" }}></Divider>
            <Stack style={{ padding: "5px" }} direction="row" spacing={0.5}>
              {Languages}
            </Stack>
            <Stack style={{ padding: "5px" }} direction="row" spacing={0.5}>
              {Tags}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={registerInterest}>Register Interest</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
