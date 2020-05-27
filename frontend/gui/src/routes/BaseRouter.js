import React from "react";
import { Route } from "react-router-dom";
import ImageDetailContainer, { ImageListContainer } from "../containers/Image";
import SignInFormContainer from "../containers/SignIn";
import SignUpFormContainer from "../containers/SignUp";
import * as RouteTypes from "./route-types";
import AuthRoute from "../routes/AuthRoute";
import AccountContainer from "../containers/Account";
import {frontendEndpoints} from "./routes";

const BaseRouter = () => {
    return (
        <div>
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path={frontendEndpoints.imageDetail}
                component={ImageDetailContainer}
            />
            <Route exact path={frontendEndpoints.signIn} component={SignInFormContainer} />
            <Route exact path={frontendEndpoints.signUp} component={SignUpFormContainer} />
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path={frontendEndpoints.images}
                component={ImageListContainer}
            />
            <AuthRoute
                type={RouteTypes.ROUTE_PROTECTED}
                exact
                path={frontendEndpoints.user}
                component={AccountContainer}
            />
        </div>
    );
};

export default BaseRouter;
