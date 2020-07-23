import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps, useLocation } from "react-router";
import { isAuthenticatedSelector } from "./store/slice";
import { frontendURLs } from "../../common/constants";

const AuthRoute: React.FC<RouteProps> = (props) => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    let location = useLocation();
    console.log("isAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
        return (
            <Redirect
                to={{
                    pathname: frontendURLs.signIn,
                    state: { from: location },
                }}
            />
        );
    } else {
        return <Route {...props} />;
    }
};
export default AuthRoute;
