import React from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { APP_NAME } from "../../../app/constants";
import DropdownMenu from "../../../common/components/DropdownMenu";
import Divider from "@material-ui/core/Divider";

import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";

import { actions as navActions } from "../slice";
import { OPEN_DRAWER } from "../actions/openDrawer";
import { getDrawerOpen } from "../selectors";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
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
}));

const AccountDropdownMenu = (props) => {
    return (
        <DropdownMenu icon={<AccountCircleIcon />} title={props.username}>
            <MenuItem>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <Typography variant="inherit">Account</Typography>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <TrendingUpRoundedIcon />
                </ListItemIcon>
                <Typography variant="inherit">Progression</Typography>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <HistoryRoundedIcon />
                </ListItemIcon>
                <Typography variant="inherit">History</Typography>
            </MenuItem>
            <Divider variant="middle"/>
            <MenuItem>
                <ListItemIcon>
                    <ExitToAppRoundedIcon />
                </ListItemIcon>
                <Typography variant="inherit">Sign Out</Typography>
            </MenuItem>
        </DropdownMenu>
    );
};

const AppBarContainer = (props) => {
    console.log(props);

    const classes = useStyles();

    const handleOpenDrawer = (event) => {
        event.preventDefault();
        props.openDrawer();
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item className={classes.menuButton}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        className={classes.menuButton}
                                        onClick={handleOpenDrawer}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        className={classes.title}
                                    >
                                        {APP_NAME}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item className={classes.centerLinks}>
                            <Grid container>
                                <Grid item>
                                    <Button color="inherit">Analyze</Button>
                                </Grid>
                                <Grid item>
                                    <Button color="inherit">About</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.rightLinks}>
                            {props.isAuthenticated ? (
                                <AccountDropdownMenu
                                    username={props.user.username}
                                />
                            ) : (
                                <Grid container>
                                    <Button color="inherit" startIcon={<ExitToAppRoundedIcon/>}>Sign In</Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: false,
    user: { email: "maxdunn123@gmail.com", username: "maxdunn" },
    drawerOpen: getDrawerOpen(state),
});
const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: () => dispatch(navActions[OPEN_DRAWER].SYNC()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppBarContainer);
