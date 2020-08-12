import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./constants";

import AuthRoute from "../features/user/AuthRoute";

import Welcome from "../features/pages/Welcome";
import About from "../features/pages/About";
import SignInFormContainer from "../features/user/containers/SignInForm";
import SignUpFormContainer from "../features/user/containers/SignUpForm";
import AccountContainer from "../features/account/containers/Account";

const RootRouterSwitch = () => {
  return (
    <Switch>
      <Route exact path={Routes.root} component={Welcome} />
      <Route exact path={Routes.welcome} component={Welcome} />
      <AuthRoute exact path={Routes.about}>
        <About />
      </AuthRoute>
      <AuthRoute exact path={Routes.account}>
        <AccountContainer />
      </AuthRoute>
      <Route exact path={Routes.signIn} component={SignInFormContainer} />
      <Route exact path={Routes.signUp} component={SignUpFormContainer} />
    </Switch>
  );
};

export default RootRouterSwitch;
