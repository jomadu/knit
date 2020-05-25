import React from "react";
import { Route } from "react-router-dom";
import ImageDetailContainer, { ImageListContainer } from "./containers/Image";
import SignInFormContainer from "./containers/SignIn";
import SignUpFormContainer from "./containers/SignUp";

const BaseRouter = () => {
    return (
        <div>
            <Route exact path="/" component={ImageListContainer} />
            <Route
                exact
                path="/images/:imageID"
                component={ImageDetailContainer}
            />
            <Route exact path="/signin" component={SignInFormContainer} />
            <Route exact path="/signup" component={SignUpFormContainer} />
        </div>
    );
};

export default BaseRouter;
