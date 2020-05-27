import React from "react";
import { Link   } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";

import { isAuthenticated } from "../selectors/index";
import { signOut } from "../store/reducers/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ConnectedNavDrawerContainer = (props) => {
    const classes = useStyles();

    let navItems = [];
    if (props.isAuthenticated) {
        navItems.push(
            <ListItem button component={Link} to={`/account/${props.username}`} key={`Account`}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={`${props.username}`} />
            </ListItem>
        );
        navItems.push(
            <ListItem button onClick={props.handleSignOut} key="Sign Out">
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
            </ListItem>
        );
    } else {
        navItems.push(
            <ListItem button component={Link} to="/signin" key="Sign In">
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
            </ListItem>
        );
    }
    navItems.push(
        <ListItem button component={Link} to="/images" key="Images">
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Images" />
        </ListItem>
    );
    return (
        <List component="nav" className={classes.root}>
            {navItems}
        </List>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    username: state.user === null ? "" : state.user.username});
const mapDispatchToProps = (dispatch) => {
    return {
        handleSignOut: () => dispatch(signOut()),
    };
};
const NavDrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNavDrawerContainer);

export default NavDrawerContainer;
