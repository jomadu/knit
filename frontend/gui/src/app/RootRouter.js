import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../features/auth/components/Auth";

const RootRouter = () => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                component={Auth}
            />
        </Switch>
    );
};

export default RootRouter;
