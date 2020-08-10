import React from "react";
import { useForm } from "react-hook-form";
import { SignUpProps } from "../duck";

export interface SignUpFormProps {
  onSignUp: (props: SignUpProps) => void;
  onSignIn: () => void;
}

interface Inputs {
  authUsername: string;
  username: string;
  password: string;
  rePassword: string;
}

const SignUpForm = ({ onSignUp, onSignIn }: SignUpFormProps) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const handleSignUp = (data: Inputs) =>
    onSignUp({
      authUsername: data.authUsername,
      username: data.username,
      password: data.password,
      rePassword: data.rePassword,
    });
  const handleSignIn = () => onSignIn();

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <label>authUsername</label>
      <input ref={register({ required: true })} name="authUsername"></input>
      <br />
      <label>username</label>
      <input ref={register({ required: true })} name="username"></input>
      <br />
      <label>password</label>
      <input
        ref={register({ required: true })}
        name="password"
        type="password"
      ></input>
      <br />
      <label>rePassword</label>
      <input
        ref={register({ required: true })}
        name="rePassword"
        type="rePassword"
      ></input>
      <br />
      <input type="submit" value="SignUp" />
      <input type="button" onClick={handleSignIn} value="SignIn" />
    </form>
  );
};

export default SignUpForm;
