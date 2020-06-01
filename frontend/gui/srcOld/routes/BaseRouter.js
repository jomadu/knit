import React from "react";
import { Route, Switch } from "react-router-dom";
import ImageDetailContainer, { ImageListContainer } from "../containers/Image";
import SignInFormContainer from "../containers/SignIn";
import SignUpFormContainer from "../containers/SignUp";
import * as RouteTypes from "./route-types";
import AuthRoute from "./AuthRoute";
import AccountContainer from "../containers/Account";
import { frontend } from "./urls";

const BaseRouter = () => {
    return (
        <Switch>
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path={frontend.imageDetail}
                component={ImageDetailContainer}
            />
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
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path={frontend.images}
                component={ImageListContainer}
            />
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path={frontend.user}
                component={AccountContainer}
            />
        </Switch>
    );
};

export default BaseRouter;
