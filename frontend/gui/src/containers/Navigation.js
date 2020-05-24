import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import InboxIcon from "@material-ui/icons/Inbox";

import NavigationListItem, {
    NavigationListItemLink,
} from "../components/Navigation";
import { isAuthenticated } from "../store/selectors/index";
import { authSignOut } from "../store/actions/index";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ConnectedNavigationContainer = (props) => {
    const classes = useStyles();

    let navItems = [];
    if (props.isAuthenticated) {
        navItems.push(
            <NavigationListItemLink
                text="My Account"
                href={"/myaccount"}
                icon={<InboxIcon />}
            />
        );
        navItems.push(
            <NavigationListItem
                text="Sign Out"
                onClick={props.onSignOut}
                icon={<InboxIcon />}
            />
        );
    } else {
        navItems.push(
            <NavigationListItemLink
                text="Sign In"
                href={"/signin"}
                icon={<InboxIcon />}
            />
        );
    }
    navItems.push(
        <NavigationListItemLink
            text="Images"
            href={"/images"}
            icon={<InboxIcon />}
        />
    );
    return (
        <nav className={classes.root}>
            <List component="nav">{navItems}</List>
        </nav>
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
const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNavigationContainer);

export default NavigationContainer;
