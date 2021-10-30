import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, Chip, Divider, Stack} from "@mui/material";
import logo from "../Assets/logo.png";
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';


export default function ProjectCard(props: any) {

    const {title, description, date, languages, tags} = props;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('close clicked');
        setOpen(false);
        console.log(open);
    };

    const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullWidth(event.target.checked);
    }

    const Tags = tags.map((tag: string) => {
        return <Chip size="small" label={tag} color="primary"/>
    });

    const Languages = languages.map((language: string) => {
        return <Chip size="small" label={language} variant="outlined" color="secondary"/>
    });

    return (
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
            <CardMedia
                component="img"
                height="194"
                image={logo}
                style={{maxWidth:"500px"}}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
                <Stack direction="row" spacing={1}>
                    {Languages}
                    {Tags}
                </Stack>
            </CardContent>

                <Button variant="outlined" onClick={handleClickOpen}>
                    Open max-width dialog
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={() => handleClose()}
                >
                    <h1>{open}</h1>
                    <DialogTitle>Optional sizes</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can set my maximum width and whether to adapt or not.
                        </DialogContentText>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                                <Select
                                    autoFocus
                                    value={maxWidth}
                                    onChange={handleMaxWidthChange}
                                    label="maxWidth"
                                    inputProps={{
                                        name: 'max-width',
                                        id: 'max-width',
                                    }}
                                >
                                    <MenuItem value={false as any}>false</MenuItem>
                                    <MenuItem value="xs">xs</MenuItem>
                                    <MenuItem value="sm">sm</MenuItem>
                                    <MenuItem value="md">md</MenuItem>
                                    <MenuItem value="lg">lg</MenuItem>
                                    <MenuItem value="xl">xl</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                sx={{ mt: 1 }}
                                control={
                                    <Switch checked={fullWidth} onChange={handleFullWidthChange} />
                                }
                                label="Full width"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
        </Card>
    );
}
