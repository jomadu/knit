import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigationContainer from "../containers/Navigation";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Layout = (props) => {
    const classes = useStyles();
    return (
        <div>
            <NavigationContainer />
            <div className={classes.root}>
                <main className={classes.content}>{props.children}</main>
            </div>
        </div>
    );
};

export default Layout;
