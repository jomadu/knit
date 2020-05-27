import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { isAuthenticated } from "../selectors/index";
import * as RouteTypes from "../constants/route-types";
const AuthRoute = (props) => {
    const { isAuthenticated, type } = props;
    console.log(`isAuthenticated:${isAuthenticated}, type:${type}`);
    if (type === RouteTypes.ROUTE_PROTECTED && !isAuthenticated) {
        return <Redirect to="/signin" />;
    } else {
        return <Route {...props} />;
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(AuthRoute);
