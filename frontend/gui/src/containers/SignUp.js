import React from "react";
import { connect } from "react-redux";
import { authSignUp } from "../store/actions/index";
import { SignUpForm } from "../components/Form";

const ConnectedSignUpContainer = (props) => {
    return <SignUpForm onSignUp={props.authSignUp} />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        authSignUp: (email, username, password, re_password) =>
            dispatch(authSignUp(email, username, password, re_password)),
    };
};

const SignUpContainer = connect(
    null,
    mapDispatchToProps
)(ConnectedSignUpContainer);

export default SignUpContainer;
