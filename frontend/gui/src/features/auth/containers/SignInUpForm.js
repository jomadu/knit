import React, {useState} from "react";
import { connect } from "react-redux";
import {isAuthenticated} from "../../auth/selectors";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

import { actions as authActions } from "../slice";
import { SIGN_IN } from "../actions/signIn";
import { SIGN_UP } from "../actions/signUp";

const SignInUpFormContainer = (props) => {
    let [currentForm, setCurrentForm] = useState("signIn");

    let form;
    switch(currentForm) {
      case "signIn":
        form = <SignInForm onSignIn={props.handleSignIn} onSignUp={() => setCurrentForm("signUp")}/>
        break;
      case "signUp":
        form = <SignUpForm onSignUp={props.handleSignUp} onSignIn={() => setCurrentForm("signIn")}/>
        break;
      default:
        throw Error("currentForm not one of 'signIn' or 'signUp'")
    }

    return form;
};

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (authUsername, password) =>
            dispatch(
                authActions[SIGN_IN].ASYNC_REQUEST(authUsername, password)
            ),
        handleSignUp: (email, username, password, rePassword) =>
            dispatch(
                authActions[SIGN_UP].ASYNC_REQUEST(
                    email,
                    { username },
                    password,
                    rePassword
                )
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInUpFormContainer);
