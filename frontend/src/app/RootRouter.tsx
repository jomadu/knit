import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./constants";

import Welcome from "../features/welcome/components/Welcome";
import SignInFormContainer from "../features/user/containers/SignInForm";

const RootRouter = () => {
  return (
    <Switch>
      <Route exact path={Routes.welcome} component={Welcome} />
      <Route exact path={Routes.signIn} compnent={SignInFormContainer} />
      <Route exact path={Routes.signUp} compnent={Welcome} />
    </Switch>
  );
};

export default RootRouter;
