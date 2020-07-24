import React from "react";
import { Route, Switch } from "react-router-dom";
import { frontendURLs } from "../common/constants";
import Welcome from "./components/Welcome";
import About from "./components/About";
import SignInFormContainer from "../features/auth/containers/SignInForm";
import SignUpFormContainer from "../features/auth/containers/SignUpForm";
import AuthRoute from "../features/auth/AuthRoute";
import AccountContainer from "../features/account/containers/Account";
import HistoryContainer from "../features/history/containers/History";
import ProgressContainer from "../features/progress/containers/Progress";
import AnalyzeContainer from "../features/analyze/containers/Analyze";
import ReportContainer from "../features/report/containers/Report";

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
            <AuthRoute
                exact
                path={frontendURLs.userHistory}
                component={HistoryContainer}
            />
            <AuthRoute
                exact
                path={frontendURLs.userProgress}
                component={ProgressContainer}
            />
            <Route
                exact
                path={frontendURLs.analyze}
                component={AnalyzeContainer}
            />
            <Route
                exact
                path={frontendURLs.report}
                component={ReportContainer}
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
