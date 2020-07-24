import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { reverse } from "named-urls";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

import { makeStyles } from "@material-ui/core/styles";
import { appName } from "../constants";
import DropdownMenu from "../../common/components/DropdownMenu";

import {
    signOut,
    isAuthenticatedSelector,
    usernameSelector,
} from "../../features/auth/store/slice";

import { frontendURLs } from "../../common/constants";

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
    },
    drawerButton: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    rightLinks: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    centerLinks: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    drawer: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    drawerTitle: {
        padding: theme.spacing(1),
    },
}));

const NavContainer = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useAppDispatch();
    const username = useSelector(usernameSelector);
    const isAuthenticated = useSelector(isAuthenticatedSelector);

    const handleSignOut = () => dispatch(signOut());

    const classes = useStyles();

    const handleToggleDrawer = (event) => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerUserItems = isAuthenticated ? (
        <div>
            <List subheader={<ListSubheader>{username}</ListSubheader>}>
                <ListItem
                    button
                    component={Link}
                    to={reverse(frontendURLs.userAccount, {
                        username: username,
                    })}
                >
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItem>

                <ListItem
                    button
                    component={Link}
                    to={reverse(frontendURLs.userProgress, {
                        username: username,
                    })}
                >
                    <ListItemIcon>
                        <TrendingUpRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Progression" />
                </ListItem>

                <ListItem
                    button
                    component={Link}
                    to={reverse(frontendURLs.userHistory, {
                        username: username,
                    })}
                >
                    <ListItemIcon>
                        <HistoryRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItem>
                <Divider variant="middle" />
                <ListItem button onClick={handleSignOut}>
                    <ListItemIcon>
                        <ExitToAppRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>
        </div>
    ) : (
        <div>
            <List>
                <ListItem button component={Link} to={frontendURLs.signIn}>
                    <ListItemIcon>
                        <ExitToAppRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                </ListItem>
            </List>
        </div>
    );

    const drawer = (
        <Drawer
            anchor={"left"}
            open={drawerOpen}
            onClose={handleToggleDrawer}
            className={classes.drawer}
        >
            <Typography variant="h4" className={classes.drawerTitle}>
                {appName}
            </Typography>
            <Divider />
            <List>
                <ListItem button component={Link} to={frontendURLs.analyze}>
                    <ListItemIcon>
                        <DirectionsRunRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Analyze" />
                </ListItem>
                <ListItem button component={Link} to={frontendURLs.about}>
                    <ListItemIcon>
                        <InfoRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
            </List>
            <Divider />
            {drawerUserItems}
        </Drawer>
    );

    const rightLinks = isAuthenticated ? (
        <DropdownMenu icon={<ArrowDropDownIcon />} title={username}>
            <MenuItem
                component={Link}
                to={reverse(frontendURLs.userAccount, {
                    username: username,
                })}
            >
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <Typography variant="inherit">Account</Typography>
            </MenuItem>
            <MenuItem component={Link}
                to={reverse(frontendURLs.userProgress, {
                    username: username,
                })}>
                <ListItemIcon>
                    <TrendingUpRoundedIcon />
                </ListItemIcon>
                <Typography variant="inherit">Progression</Typography>
            </MenuItem>
            <MenuItem component={Link}
                to={reverse(frontendURLs.userHistory, {
                    username: username,
                })}>
                <ListItemIcon>
                    <HistoryRoundedIcon />
                </ListItemIcon>
                <Typography variant="inherit">History</Typography>
            </MenuItem>
            <Divider variant="middle" />
            <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                    <ExitToAppRoundedIcon />
                </ListItemIcon>
                <Typography variant="inherit">Sign Out</Typography>
            </MenuItem>
        </DropdownMenu>
    ) : (
        <Button
            color="inherit"
            startIcon={<ExitToAppRoundedIcon />}
            component={Link}
            to={frontendURLs.signIn}
        >
            Sign In
        </Button>
    );

    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item className={classes.drawerButton}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        className={classes.drawerButton}
                                        onClick={handleToggleDrawer}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        {appName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item className={classes.centerLinks}>
                            <Grid container>
                                <Grid item>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to={frontendURLs.analyze}
                                    >
                                        Analyze
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to={frontendURLs.about}
                                    >
                                        About
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.rightLinks}>
                            {rightLinks}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {drawer}
        </div>
    );
};

export default NavContainer;
