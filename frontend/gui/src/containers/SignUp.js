import React from "react";
import { connect } from "react-redux";
import { authSignUp } from "../store/actions/index";
import SignUp from "../components/SignUp";

const ConnectedSignUpContainer = (props) => {
    return <SignUp onSignUp={props.authSignUp} />;
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
