import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
    actions as authActions,
    USER_URL_FIELD,
} from "../store/reducers/auth";
import SignUpForm from "../components/Form/SignUp";
import isAuthenticated from "../selectors/index";
import { reverse } from "named-urls";
import { frontend } from "../routes/urls";

const SignUpFormContainer = (props) => {
    if (props.isAuthenticated)
        return (
            <Redirect
                to={reverse(frontend.user, {
                    [USER_URL_FIELD]: props[USER_URL_FIELD],
                })}
            />
        );
    return <SignUpForm onSignUp={props.handleSignUp} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    [USER_URL_FIELD]:
        state.user && state.user[USER_URL_FIELD]
            ? state.user[USER_URL_FIELD]
            : "",
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignUp: (email, username, password, rePassword) =>
            dispatch(
                authActions.SIGN_UP_REQUEST(
                    email,
                    { username },
                    password,
                    rePassword
                )
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);
