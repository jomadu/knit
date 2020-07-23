import React from "react";
import { RouteComponentProps} from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { frontendURLs } from "../common/constants";
import AuthRoute from "../features/account2/AuthRoute";
import Welcome from "./components/Welcome";
import About from "./components/About";
import AnalyzeContainer from "../features/analyze/containers/Analyze";
import SignInFormContainer, {ISignInFormContainerProps} from "../features/account2/containers/SignInForm";
import SignUpFormContainer from "../features/account2/containers/SignUpForm";

const RootRouter = () => {
    return (
        <Switch>
            <Route exact path={frontendURLs.welcome} component={Welcome} />
            <Route exact path={frontendURLs.about} component={About} />
            <Route
                exact
                path={frontendURLs.analyze}
                component={AnalyzeContainer}
            />
            <Route exact path={frontendURLs.test} render={() => <SignInFormContainer/>}/>
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
            <AuthRoute exact path={"/protected"} render={() => <h1>Protected Page!</h1>} />
        </Switch>
    );
};

export default RootRouter;
