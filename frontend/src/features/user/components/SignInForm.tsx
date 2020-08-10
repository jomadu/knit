import React from "react";
import { useForm } from "react-hook-form";
import { SignInProps } from "../duck";

export interface SignInFormProps {
  onSignIn: (props: SignInProps) => void;
  onSignUp: () => void;
}

interface Inputs {
  authUsername: string;
  password: string;
}

const SignInForm = ({ onSignIn, onSignUp }: SignInFormProps) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const handleSignIn = (data: Inputs) =>
    onSignIn({ authUsername: data.authUsername, password: data.password });
  const handleSignUp = () => onSignUp();

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <label>username</label>
      <input ref={register({ required: true })} name="authUsername"></input>
      <br />
      <label>password</label>
      <input
        ref={register({ required: true })}
        name="password"
        type="password"
      ></input>
      <br />
      <input type="submit" value="SignIn" />
      <input type="button" onClick={handleSignUp} value="SignUp" />
    </form>
  );
};

export default SignInForm;
