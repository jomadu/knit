import React from "react";
import { Router } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PhotoIcon from "@material-ui/icons/Photo";
import Typography from "@material-ui/core/Typography";

import { frontend } from "../routes/urls";
import { reverse } from "named-urls";

const ImageDetail = ({ image }) => {
    return (
        <Paper elevation={2}>
            <Typography variant="h2">{image.title}</Typography>
            <Typography variant="subtitle1">{image.description}</Typography>
            <Typography>{image.owner}</Typography>
            <Typography>{image.created}</Typography>
        </Paper>
    );
};
export const ImageList = ({ images }) => {
    const listItems = images.map((image) => {
        return (
            <ListItem
                button
                component={Router}
                to={reverse(frontend.imageDetail, {
                    id: image.id,
                })}
            >
                <ListItemIcon>
                    <PhotoIcon />
                </ListItemIcon>
                <ListItemText primary={image.title} />
            </ListItem>
        );
    });
    return <List component="nav">{listItems}</List>;
};

export default ImageDetail;
