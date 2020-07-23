import React from "react";
import { useAppDispatch } from "../../../app/store";
import { signUp } from "../store/slice";
import SignUpForm from "../components/SignUpForm";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { frontendURLs } from "../../../common/constants";


const SignUpFormContainer: React.FC<RouteComponentProps> = () => {
    const dispatch = useAppDispatch();
    let history = useHistory();

    const handleSignUp = (authUsername: string, username: string, password: string, rePassword: string ) => {
      dispatch(signUp({authUsername: authUsername, username: username, password: password, rePassword: rePassword}))
    };
    const handleSignIn = () => history.push(frontendURLs.signIn);

    return <SignUpForm onSignUp={handleSignUp} onSignIn={handleSignIn}/>
}

export default SignUpFormContainer;