import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../store/reducers/auth";
import SignUpForm from "../components/Form/SignUp";
import isAuthenticated from "../selectors/index";
import {reverse} from "named-urls";
import {frontend} from "../routes/urls";

const SignUpFormContainer = (props) => {
    if (props.isAuthenticated)
        return <Redirect to={reverse(frontend.user, {username: props.username})} />;
    return <SignUpForm onSignUp={props.handleSignUp} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    username: state.user && state.user.username ? state.user.username : "",
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignUp: (email, username, password, re_password) =>
            dispatch(signUp(email, username, password, re_password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);
