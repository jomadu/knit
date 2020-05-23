import React from "react";
import { Route } from "react-router-dom";
import ImageDetailContainer, { ImageListContainer } from "./containers/Image";
import SignInContainer from "./containers/SignIn";
import SignUpContainer from "./containers/SignUp";

const BaseRouter = () => {
    return (
        <div>
            <Route exact path="/" component={ImageListContainer} />
            <Route
                exact
                path="/images/:imageID"
                component={ImageDetailContainer}
            />
            <Route exact path="/signin" component={SignInContainer} />
            <Route exact path="/signup" component={SignUpContainer} />
        </div>
    );
};

export default BaseRouter;
