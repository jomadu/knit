import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./constants";

import AuthRoute from "../features/user/AuthRoute";

import Welcome from "../features/welcome/components/Welcome";
import About from "../features/about/components/About";
import SignInFormContainer from "../features/user/containers/SignInForm";
import SignUpFormContainer from "../features/user/containers/SignUpForm";

const RootRouterSwitch = () => {
  return (
    <Switch>
      <Route exact path={Routes.root} component={Welcome} />
      <Route exact path={Routes.welcome} component={Welcome} />
      <AuthRoute exact path={Routes.about}>
        <About />
      </AuthRoute>
      <Route exact path={Routes.signIn} component={SignInFormContainer} />
      <Route exact path={Routes.signUp} component={SignUpFormContainer} />
    </Switch>
  );
};

export default RootRouterSwitch;
