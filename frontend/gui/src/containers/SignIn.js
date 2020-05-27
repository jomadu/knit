import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../store/reducers/auth";
import SignInForm from "../components/Form/SignIn";
import isAuthenticated from "../selectors/index";

const SignInFormContainer = (props) => {
    if (props.isAuthenticated)
        return <Redirect to={`/users/${props.username}`} />;
    return <SignInForm onSignIn={props.handleSignIn} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    username: state.user && state.user.username  ? state.user.username : "",
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (email, password) => dispatch(signIn(email, password)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInFormContainer);
