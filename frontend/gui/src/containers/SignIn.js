import React from "react";
import { connect } from "react-redux";
import { authSignIn } from "../store/actions/index";
import { SignInForm } from "../components/Form";

const ConnectedSignInFormContainer = (props) => {
    return <SignInForm onSignIn={props.authSignIn} />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        authSignIn: (email, password) => dispatch(authSignIn(email, password)),
    };
};

const SignInFormContainer = connect(
    null,
    mapDispatchToProps
)(ConnectedSignInFormContainer);

export default SignInFormContainer;
