import React from "react";
import { connect } from "react-redux";
import { signUp } from "../store/reducers/auth";
import SignUpForm from "../components/Form/SignUp";

const SignUpFormContainer = (props) => {
    return <SignUpForm onSignUp={props.handleSignUp} />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignUp: (email, username, password, re_password) =>
            dispatch(signUp(email, username, password, re_password)),
    };
};

export default connect(null, mapDispatchToProps)(SignUpFormContainer);
