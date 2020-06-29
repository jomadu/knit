import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm";
// import isAuthenticated from "../selectors/index";
import { reverse } from "named-urls";
import { frontend } from "../../../common/urls";
import { USER_FIELDS } from "../constants";
import { isAuthenticated } from "../selectors";

import { actions as authActions } from "../slice";
import { SIGN_IN } from "../actions/signIn";

const SignInFormContainer = (props) => {
    if (props.authenticatedUser)
        return (
            <Redirect
                to={reverse(frontend.user, {
                    [USER_FIELDS.USERNAME]:
                        props.authenticatedUser[USER_FIELDS.USERNAME],
                })}
            />
        );
    return <SignInForm onSignIn={props.handleSignIn} />;
};

const mapStateToProps = (state) => ({
    authenticatedUser: getAuthenticatedUser(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (authUsername, password) =>
            dispatch(authActions[SIGN_IN].ASYNC_REQUEST(authUsername, password)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInFormContainer);
