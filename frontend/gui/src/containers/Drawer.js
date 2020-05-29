import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CollectionsIcon from "@material-ui/icons/Collections";

import { isAuthenticated } from "../selectors/index";
import { actions as authActions, USER_URL_FIELD } from "../store/reducers/auth";

import { frontend } from "../routes/urls";
import { reverse } from "named-urls";

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
            <ListItem
                button
                component={Link}
                to={reverse(frontend.user, {
                    [USER_URL_FIELD]: props[USER_URL_FIELD],
                })}
                key="Account"
            >
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={`${props[USER_URL_FIELD]}`} />
            </ListItem>
        );
        navItems.push(
            <ListItem button onClick={props.handleSignOut} key="Sign Out">
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
            </ListItem>
        );
    } else {
        navItems.push(
            <ListItem
                button
                component={Link}
                to={frontend.signIn}
                key="Sign In"
            >
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
            </ListItem>
        );
    }
    navItems.push(
        <ListItem
            button
            component={Link}
            to={frontend.images}
            key="Images"
        >
            <ListItemIcon>
                <CollectionsIcon />
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
    [USER_URL_FIELD]: state.user && state.user[USER_URL_FIELD]  ? state.user[USER_URL_FIELD] : "",
});
const mapDispatchToProps = (dispatch) => {
    return {
        handleSignOut: () => dispatch(authActions.SIGN_OUT_REQUEST()),
    };
};
const NavDrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNavDrawerContainer);

export default NavDrawerContainer;
