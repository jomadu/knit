import React from "react";
import { connect } from "react-redux";
import { authSignUp } from "../store/actions/index";
import SignUpForm from "../components/Form/SignUp";

const ConnectedSignUpFormContainer = (props) => {
    return <SignUpForm onSignUp={props.authSignUp} />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        authSignUp: (email, username, password, re_password) =>
            dispatch(authSignUp(email, username, password, re_password)),
    };
};

const SignUpFormContainer = connect(
    null,
    mapDispatchToProps
)(ConnectedSignUpFormContainer);

export default SignUpFormContainer;
