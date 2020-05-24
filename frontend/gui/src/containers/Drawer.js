import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";

import { isAuthenticated } from "../store/selectors/index";
import { authSignOut } from "../store/actions/index";

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
            <ListItem button component="a" href="/myaccount" key="My Account">
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
            </ListItem>
        );
        navItems.push(
            <ListItem button onClick={props.onSignOut} key="Sign Out">
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
            </ListItem>
        );
    } else {
        navItems.push(
            <ListItem button component="a" href="/signin" key="Sign In">
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
            </ListItem>
        );
    }
    navItems.push(
        <ListItem button component="a" href="/images" key="Images">
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
});
const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => dispatch(authSignOut()),
    };
};
const NavDrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNavDrawerContainer);

export default NavDrawerContainer;
