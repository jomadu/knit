import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AppBarContainer from "../../features/nav/containers/AppBar";
import DrawerContainer from "../../features/nav/containers/Drawer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const Layout = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBarContainer/>
            <DrawerContainer/>
            <main>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
