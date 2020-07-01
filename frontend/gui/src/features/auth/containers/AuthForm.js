import React, { useState } from "react";
import { connect } from "react-redux";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

import { actions as authActions } from "../slice";
import { SIGN_IN } from "../actions/signIn";
import { SIGN_UP } from "../actions/signUp";
import { SIGN_OUT } from "../actions/signOut";
import { Grid, Typography, Button } from "@material-ui/core";
import {
    isAuthenticated,
    getUserAuthUsernameField,
    getUserUsernameField,
} from "../selectors";

const AuthFormContainer = (props) => {
    let [currentForm, setCurrentForm] = useState("signIn");

    let signInUpform;
    switch (currentForm) {
        case "signIn":
            signInUpform = (
                <SignInForm
                    onSignIn={props.handleSignIn}
                    onSignUp={() => setCurrentForm("signUp")}
                />
            );
            break;
        case "signUp":
            signInUpform = (
                <SignUpForm
                    onSignUp={props.handleSignUp}
                    onSignIn={() => setCurrentForm("signIn")}
                />
            );
            break;
        default:
            throw Error("currentForm not one of 'signIn' or 'signUp'");
    }

    const signOut = (
        <Grid container alignItems="baseline">
            <Grid item xs={12}>
                <Typography variant="body1" align="center">
                    Signed in as {props.authUsername} ({props.username})
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={props.handleSignOut}
                >
                    Sign Out
                </Button>
            </Grid>
        </Grid>
    );
    return props.isAuthenticated ? signOut : signInUpform;
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    authUsername: getUserAuthUsernameField(state),
    username: getUserUsernameField(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (authUsername, password) =>
            dispatch(
                authActions[SIGN_IN].ASYNC_REQUEST(authUsername, password)
            ),
        handleSignUp: (email, username, password, rePassword) =>
            dispatch(
                authActions[SIGN_UP].ASYNC_REQUEST(
                    email,
                    { username },
                    password,
                    rePassword
                )
            ),
        handleSignOut: () => dispatch(authActions[SIGN_OUT].SYNC()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer);
