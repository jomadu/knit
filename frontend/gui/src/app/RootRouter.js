import React from "react";
import { Route, Switch } from "react-router-dom";
import { frontend } from "../common/urls";
import Welcome from "./components/Welcome";
import About from "./components/About";
import AnalyzeContainer from "../features/analyze/containers/Analyze";
import Auth from "../features/auth/components/Auth";
import AccountContainer from "../features/account/containers/Account";
import ReportContainer from "../features/report/containers/Report";

const RootRouter = () => {
    return (
        <Switch>
            <Route exact path={frontend.welcome} component={Welcome} />
            <Route exact path={frontend.about} component={About} />
            <Route exact path={frontend.analyze} component={AnalyzeContainer} />
            <Route exact path={frontend.signIn} component={Auth} />
            <Route exact path={frontend.userAccount} component={AccountContainer} />
            <Route exact path={frontend.test} component={ReportContainer}/>
        </Switch>
    );
};

export default RootRouter;
