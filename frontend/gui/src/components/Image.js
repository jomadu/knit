import React from "react";
import {Link} from 'react-router-dom';

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PhotoIcon from "@material-ui/icons/Photo";
import Typography from "@material-ui/core/Typography";


const ImageDetail = (props) => {
    return (
        <Paper elevation={2}>
            <Typography variant='h2'>{props.image.title}</Typography>
            <Typography variant='subtitle1'>{props.image.description}</Typography>
            <Typography>{props.image.owner}</Typography>
            <Typography>{props.image.created}</Typography>
        </Paper>
    );
};

const ImageListItem = (props) => {
    console.log(props);
    return (
        <ListItem button component={Link} to={`/${props.image.id}`}>
            <ListItemIcon>
                <PhotoIcon />
            </ListItemIcon>
            <ListItemText primary={props.image.title}/>
        </ListItem>
    );
};

export const ImageList = (props) => {
    const images = props.images;
    const listItems = images.map((image) => {
        return <ImageListItem image={image} key={image.id} />;
    });
    return <List component="nav">{listItems}</List>;
};

export default ImageDetail;
