import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SignUpForm from "../components/SignUpForm";
import { reverse } from "named-urls";
import { frontend } from "../../../common/urls";
import { actions as authActions } from "../slice";
import { isAuthenticated, getUser } from "../selectors";
import { USER_FIELDS } from "../constants";
import { SIGN_UP } from "../actions/signUp";

const SignUpFormContainer = (props) => {
    if (props.authenticatedUser)
            return (
                <Redirect
                    to={reverse(frontend.user, {
                        [USER_FIELDS.USERNAME]: props.authenticatedUser[USER_FIELDS.USERNAME],
                    })}
                />
            );
    return <SignUpForm onSignUp={props.handleSignUp} />;
};

const mapStateToProps = (state) => ({
    authenticatedUser: getAuthenticatedUser(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignUp: (email, username, password, rePassword) =>
            dispatch(
                authActions[SIGN_UP].ASYNC_REQUEST(
                    email,
                    { username },
                    password,
                    rePassword
                )
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpFormContainer);
