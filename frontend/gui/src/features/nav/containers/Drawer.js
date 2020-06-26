import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";

import { APP_NAME } from "../../../app/constants";
import { actions as navActions } from "../slice";
import { CLOSE_DRAWER } from "../actions/closeDrawer";
import { getDrawerOpen } from "../selectors";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    title: {
        padding: theme.spacing(1),
    },
    list: {
        width: "auto",
    },
}));

const DrawerContainer = (props) => {
    const classes = useStyles();

    const userListItems = props.isAuthenticated && props.user ? (
        <div>
            <Divider/>
            <List
                subheader={<ListSubheader>{props.user.username}</ListSubheader>}
            >
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>

                    <ListItemText primary="Account" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <TrendingUpRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Progression" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <HistoryRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItem>
                <Divider variant="middle"/>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToAppRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>
        </div>
    ) : (
        <div>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToAppRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Drawer
            anchor={"left"}
            open={props.drawerOpen}
            onClose={props.closeDrawer}
            className={classes.root}
        >
            <Typography variant="h4" className={classes.title}>
                {APP_NAME}
            </Typography>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <DirectionsRunRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Analyze" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InfoRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
            </List>
            {userListItems}
        </Drawer>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: false,
    user: {
        username: "maxdunn",
        email: "maxdunn123@gmail.com",
    },
    drawerOpen: getDrawerOpen(state),
});
const mapDispatchToProps = (dispatch) => {
    return {
        closeDrawer: () => dispatch(navActions[CLOSE_DRAWER].SYNC()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
