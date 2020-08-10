import React, { useEffect } from "react";
import {
  withRouter,
  useHistory,
  useLocation,
  RouteComponentProps,
} from "react-router";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector, SignInProps, signIn } from "../duck";
import { Routes, isFromLocationState } from "../../../app/constants";

import SignInForm from "../components/SignInForm";

export interface SignInFormContainerProps extends RouteComponentProps {
  redirect?: Routes;
}

export const SignInFormContainer = ({
  redirect = Routes.welcome,
}: SignInFormContainerProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      if (isFromLocationState(location)) {
        history.replace(location.state.from.pathname);
      } else {
        history.replace(redirect);
      }
    }
  }, [redirect, isAuthenticated, history, location]);

  const handleSignIn = (props: SignInProps) => dispatch(signIn(props));
  const handleSignUp = () => history.push(Routes.signUp);

  return <SignInForm onSignIn={handleSignIn} onSignUp={handleSignUp} />;
};

export default withRouter(SignInFormContainer);
