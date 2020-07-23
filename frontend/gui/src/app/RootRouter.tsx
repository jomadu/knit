import React from "react";
import { Route, Switch } from "react-router-dom";
import { frontendURLs } from "../common/constants";
import Welcome from "./components/Welcome";
import About from "./components/About";
import SignInFormContainer from "../features/auth/containers/SignInForm";
import SignUpFormContainer from "../features/auth/containers/SignUpForm";
import AuthRoute from "../features/auth/AuthRoute";
import AccountContainer from "../features/account/containers/Account";

const RootRouter = () => {
    return (
        <Switch>
            <Route exact path={frontendURLs.welcome} component={Welcome} />
            <Route exact path={frontendURLs.about} component={About} />
            <AuthRoute
                exact
                path={frontendURLs.userAccount}
                component={AccountContainer}
            />
            <Route
                exact
                path={frontendURLs.signIn}
                component={SignInFormContainer}
            />
            <Route
                exact
                path={frontendURLs.signUp}
                component={SignUpFormContainer}
            />
            <Route
                exact
                path={frontendURLs.test}
                render={() => <SignInFormContainer />}
            />
        </Switch>
    );
};

export default RootRouter;
