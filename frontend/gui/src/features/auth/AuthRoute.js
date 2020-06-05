import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { isAuthenticated } from "./selectors";
import {frontend} from "../../common/urls";

export const PUBLIC_ROUTE = 'PUBLIC_ROUTE';
export const PROTECTED_ROUTE = 'PROTECTED_ROUTE';

const AuthRoute = (props) => {
    const { isAuthenticated, type } = props;
    if (type === PROTECTED_ROUTE && !isAuthenticated) {
        return <Redirect to={frontend.signIn} />;
    } else {
        return <Route {...props} />;
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(AuthRoute);
