import React from "react";
import { SignInProps } from "../duck";

export interface SignInFormProps {
  onSignIn: (props: SignInProps) => void;
  onSignUp: () => void;
}

const SignInForm = ({ onSignIn, onSignUp }: SignInFormProps) => {
  const handleSignIn = () =>
    onSignIn({ authUsername: "maxdunn123@gmail.com", password: "password" });
  const handleSignUp = () => onSignUp();

  return (
    <>
      <button onClick={handleSignIn}>SignIn</button>
      <button onClick={handleSignUp}>SignUp</button>
    </>
  );
};

export default SignInForm;
