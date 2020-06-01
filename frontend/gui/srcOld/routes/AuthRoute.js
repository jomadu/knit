import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { isAuthenticated } from "../selectors/index";
import * as RouteTypes from "./route-types";

import {frontend} from "./urls";
const AuthRoute = (props) => {
    const { isAuthenticated, type } = props;
    if (type === RouteTypes.ROUTE_PROTECTED && !isAuthenticated) {
        return <Redirect to={frontend.signIn} />;
    } else {
        return <Route {...props} />;
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(AuthRoute);
