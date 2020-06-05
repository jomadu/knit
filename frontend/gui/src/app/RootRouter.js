import React from "react";
import { Route, Switch } from "react-router-dom";
import {frontend} from "../common/urls";
import SignInFormContainer from "../features/auth/containers/SignIn";
import SignUpFormContainer from "../features/auth/containers/SignUp";
import UserHomeContainer from "../features/auth/containers/UserHome";
import AuthRoute, {PROTECTED_ROUTE} from "../features/auth/AuthRoute";

const RootRouter = () => {
    return (
        <Switch>
            <Route
                exact
                path={frontend.signIn}
                component={SignInFormContainer}
            />
            <Route
                exact
                path={frontend.signUp}
                component={SignUpFormContainer}
            />
            <AuthRoute
                type={PROTECTED_ROUTE}
                exact
                path={frontend.user}
                component={UserHomeContainer}
            />
        </Switch>
    );
};

export default RootRouter;
