import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavContainer from "../containers/Nav";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const Layout = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavContainer/>
            <main>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
