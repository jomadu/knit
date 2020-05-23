import React from "react";
import { connect } from "react-redux";
import { authSignIn } from "../store/actions/index";
import SignIn from "../components/SignIn";

const ConnectedSignInContainer = (props) => {
    return <SignIn onSignIn={props.authSignIn} />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        authSignIn: (email, password) => dispatch(authSignIn(email, password)),
    };
};

const SignInContainer = connect(
    null,
    mapDispatchToProps
)(ConnectedSignInContainer);

export default SignInContainer;
