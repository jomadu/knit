import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import NavContainer from "../containers/Nav";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    })
);

const Layout: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavContainer />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
