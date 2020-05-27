import React from "react";
import { connect } from "react-redux";
import isAuthenticated from "../selectors/index";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary,
    },
}));

export const AccountContainer = (props) => {
    const classes = useStyles();

    let accountInfo;
    if (props.isAuthenticated) {
        accountInfo = (
            <div>
                <Typography variant="h1">{props.user.username}</Typography>
                
                <Typography variant="body1">Email: {props.user.email}</Typography>
                <Typography variant="body1">ID: {props.user.id}</Typography>
            </div>
        );
    } else {
        accountInfo = <Typography variant="h1">Not Authenticated</Typography>;
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {accountInfo}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    user: state.user,
});

export default connect(mapStateToProps, null)(AccountContainer);
