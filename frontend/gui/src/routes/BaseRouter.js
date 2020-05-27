import React from "react";
import { Route } from "react-router-dom";
import ImageDetailContainer, { ImageListContainer } from "../containers/Image";
import SignInFormContainer from "../containers/SignIn";
import SignUpFormContainer from "../containers/SignUp";
import * as RouteTypes from "../constants/route-types";
import AuthRoute from "../routes/AuthRoute";
import AccountContainer from "../containers/Account";

const BaseRouter = () => {
    return (
        <div>
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path="/images/:imageID"
                component={ImageDetailContainer}
            />
            <Route exact path="/signin" component={SignInFormContainer} />
            <Route exact path="/signup" component={SignUpFormContainer} />
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path="/images"
                component={ImageListContainer}
            />
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path="/account/:accountUsername"
                component={AccountContainer}
            />
        </div>
    );
};

export default BaseRouter;
