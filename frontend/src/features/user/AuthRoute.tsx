import React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "./duck";
import { Routes } from "../../app/constants";

const AuthRoute = ({ children, ...rest }: RouteProps) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.signIn,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
