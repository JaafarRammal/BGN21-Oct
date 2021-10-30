import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {AppBar, Button, Chip, Stack, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import logo from "../Assets/logo.png";
import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {SelectChangeEvent} from "@mui/material/Select";
import CloseIcon from '@mui/icons-material/Close';

export default function ProjectCard(props: any) {
    const {title, description, date, languages, tags} = props;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("close clicked");
        setOpen(false);
        console.log(open);
    };

    const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value
        );
    };

    const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullWidth(event.target.checked);
    };

    const Tags = tags.map((tag: string) => {
        return <Chip size="small" label={tag} color="primary"/>;
    });

    const Languages = languages.map((language: string) => {
        return <Chip size="small" label={language} variant="outlined" color="secondary"/>;
    });

    const registerInterest = () => {
      console.log('RegisterInterest: ', title);
      // Do some animation or add to saved project list
      handleClose();
    }

    return (
        <div>
            <Card sx={{maxWidth: 500}} onClick={handleClickOpen}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={title}
                    subheader={date}
                />
                <CardMedia component="img" height="194" image={logo} style={{maxWidth: "500px"}}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        {Languages}
                        {Tags}
                    </Stack>
                </CardContent>
            </Card>
            <Dialog open={open} onClose={() => handleClose()}>
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Project Details
                  </Typography>
                </Toolbar>
              </AppBar>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={registerInterest}>Register Interest</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
