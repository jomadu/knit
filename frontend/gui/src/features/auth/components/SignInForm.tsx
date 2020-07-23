import React, { MouseEvent } from "react";
import { useForm } from "../../../common/hooks/useForm";

interface Props {
    onSignIn: (authUsername: string, password: string) => void;
    onSignUp: (event?: MouseEvent<HTMLButtonElement>) => void;
}

interface FormState {
    authUsername: string;
    password: string;
}

const SignInForm: React.FC<Props> = ({ onSignIn, onSignUp }) => {
    const initialFormState: FormState = {
        authUsername: "",
        password: "",
    };
    const { handleChange, handleSubmit, values } = useForm<FormState>(
        initialFormState,
        () => onSignIn(values.authUsername, values.password)
    );

    const handleSignUp = () => onSignUp();

    return (
        <form onSubmit={handleSubmit}>
            {/* Avoid Chrome autofill */}
            <input
                autoComplete="email"
                name="email"
                style={{ display: "none" }}
            ></input>
            <input
                autoComplete="current-password"
                name="password"
                style={{ display: "none" }}
            ></input>
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
            <br />
            <input type="submit" value="Sign In" />
            <input type="button" onClick={handleSignUp} value="Sign Up" />
        </form>
    );
};

export default SignInForm;
