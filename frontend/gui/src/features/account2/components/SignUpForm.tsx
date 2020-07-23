import React, { MouseEvent } from "react";
import { useForm } from "../../../common/hooks/useForm";

interface Props {
    onSignUp: (authUsername: string, username: string, password: string, rePassword: string) => void;
    onSignIn: (event?: MouseEvent<HTMLButtonElement>) => void;
}

interface FormState {
    authUsername: string;
    username: string;
    password: string;
    rePassword: string;
}

const SignUpForm: React.FC<Props> = ({ onSignIn, onSignUp }) => {
    const initialFormState: FormState = {
        authUsername: "",
        username: "",
        password: "",
        rePassword: "",
    };
    const { handleChange, handleSubmit, values } = useForm<FormState>(
        initialFormState,
        () => onSignUp(values.authUsername, values.username, values.password, values.rePassword)
    );

    const handleSignIn = () => onSignIn();

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="text"
                    id="authUsername"
                    name="authUsername"
                    value={values.authUsername}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Username:
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Re-Password:
                <input
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    value={values.rePassword}
                    onChange={handleChange}
                />
            </label>
            <br />
            <br />
            <input type="submit" value="Sign In" />
            <input type="button" onClick={handleSignIn} value="Sign Up" />
        </form>
    );
};

export default SignUpForm;
