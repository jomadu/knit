import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export const NavigationListItem = (props) => {
    return (
        <ListItem button onClick={props.onClick}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.text} />
        </ListItem>
    );
};

export const NavigationListItemLink = (props) => {
    return (
        <ListItem button component="a" {...props}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.text} />
        </ListItem>
    );
};

export default NavigationListItem;
