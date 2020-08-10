import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector, SignUpProps, signUp } from "../duck";
import { Routes } from "../../../app/constants";

import SignUpForm from "../components/SignUpForm";

export interface SignUpFormContainerProps {
  redirect?: string;
}

export const SignUpFormContainer = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace(Routes.welcome);
    }
  }, [isAuthenticated, history]);

  const handleSignUp = (props: SignUpProps) => dispatch(signUp(props));
  const handleSignIn = () => history.push(Routes.signIn);

  return <SignUpForm onSignUp={handleSignUp} onSignIn={handleSignIn} />;
};

export default withRouter(SignUpFormContainer);
