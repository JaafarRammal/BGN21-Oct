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
import {Chip, Divider, Stack} from "@mui/material";
import logo from "../Assets/logo.png";


export default function ProjectCard(props: any) {

    const {title, description, date, languages, tags} = props;

    const Tags = tags.map((tag: string) => {
        return <Chip size="small" label={tag} color="primary"/>
    });

    const Languages = languages.map((language: string) => {
        return <Chip size="small" label={language} variant="outlined" color="secondary"/>
    });

    return (
        <Card sx={{maxWidth: 500}}>
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
        </Card>
    );
}
