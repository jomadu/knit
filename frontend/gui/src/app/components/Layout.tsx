import React, {FunctionComponent} from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import NavContainer from "../containers/Nav";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    })
);

const Layout: FunctionComponent = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavContainer />
            <main>{props.children}</main>
        </div>
    );
};

export default Layout;
