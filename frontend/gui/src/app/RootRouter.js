import React from "react";
import { Route, Switch } from "react-router-dom";
import { frontend } from "../common/urls";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Analyze from "../features/analyze/containers/Analyze";
import Auth from "../features/auth/components/Auth";

const RootRouter = () => {
    return (
        <Switch>
            <Route exact path={frontend.welcome} component={Welcome} />
            <Route exact path={frontend.about} component={About} />
            <Route exact path={frontend.analyze} component={Analyze} />
            <Route exact path={frontend.signIn} component={Auth} />
            {/* <Route exact path={frontend.userAccount} component={Account} /> */}
        </Switch>
    );
};

export default RootRouter;
