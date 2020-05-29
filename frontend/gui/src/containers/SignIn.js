import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actions as authActions, USER_URL_FIELD } from "../store/reducers/auth";
import SignInForm from "../components/Form/SignIn";
import isAuthenticated from "../selectors/index";
import {reverse} from "named-urls";
import {frontend} from "../routes/urls";

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
        handleSignIn: (username, password) => dispatch(authActions.SIGN_IN_REQUEST(username, password)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInFormContainer);
