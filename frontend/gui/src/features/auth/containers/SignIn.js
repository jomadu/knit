import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignInForm from "../components/SignIn";
// import isAuthenticated from "../selectors/index";
import {reverse} from "named-urls";
import {frontend} from "../../../common/urls";
import {USER_URL_FIELD} from "../constants";
import {isAuthenticated} from "../selectors";

import {actions as authActions} from "../slice";
import {SIGN_IN} from "../actions/signIn";

const SignInFormContainer = (props) => {
    if (props.isAuthenticated)
        return <Redirect to={reverse(frontend.user, {[USER_URL_FIELD]: props[USER_URL_FIELD]})} />;
    return <SignInForm onSignIn={props.handleSignIn} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    [USER_URL_FIELD]: state.user && state.user[USER_URL_FIELD]  ? state.user[USER_URL_FIELD] : "",
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (username, password) => dispatch(authActions[SIGN_IN].ASYNC_REQUEST(username, password)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInFormContainer);
