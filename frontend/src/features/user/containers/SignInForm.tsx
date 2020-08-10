import React, { useEffect } from "react";
import {
  withRouter,
  RouteComponentProps,
  useLocation,
  useHistory,
} from "react-router";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector, SignInProps, signIn } from "../duck";
import { Routes } from "../../../app/constants";

import SignInForm from "../components/SignInForm";

export interface SignInFormContainerProps {
  redirect?: string;
}

export const SignInFormContainer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace(Routes.welcome);
    }
  });

  const handleSignIn = (props: SignInProps) => dispatch(signIn(props));
  const handleSignUp = () => history.push(Routes.signUp);

  return <SignInForm onSignIn={handleSignIn} onSignUp={handleSignUp} />;
};

export default withRouter(SignInFormContainer);
