import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, RouteComponentProps, Redirect, withRouter } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import { signIn, isAuthenticatedSelector } from "../store/slice";
import SignInForm from "../components/SignInForm";
import { frontendURLs, LocationState } from "../../../common/constants";

const SignInFormContainer: React.FC<SignInFormContainerProps> = ({ redirect = null }) => {
    const dispatch = useAppDispatch();
    let history = useHistory();
    let location = useLocation<LocationState>();
    const { from } = location.state || { from: {pathname: null}};
    const isAuthenticated = useSelector(isAuthenticatedSelector);

    const handleSignIn = (authUsername: string, password: string) => {
        dispatch(signIn({ authUsername: authUsername, password: password }));
    };
    const handleSignUp = () => history.push(frontendURLs.signUp);
    
    if (!isAuthenticated){
      return <SignInForm onSignIn={handleSignIn} onSignUp={handleSignUp} />;
    }
    else if (redirect)
    {
      return <Redirect to={redirect} />;
    }
    else if (from.pathname) {
      return <Redirect to={from}/>
    }
    else {
      return <h3>Signed In!</h3>
    }
};

export interface SignInFormContainerProps extends RouteComponentProps {
    redirect?: string;
}

export default withRouter(SignInFormContainer);
