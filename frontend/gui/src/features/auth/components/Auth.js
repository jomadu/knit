import React from "react";
import { connect } from "react-redux";
import { actions } from "../authSlice";

const Auth = (props) => {
    const handleSignIn = (username, password) =>
        props.handleSignIn("maxdunn123@gmail.com", "flashyCactus69!");
    const handleSignUp = (username, requiredFields, password, rePassword) =>
        props.handleSignUp(
            "phil@gmail.com",
            "phil",
            "goodpass29",
            "goodpass29"
        );
    return (
        <div>
            <div>Hello World</div>
            <button onClick={handleSignIn}>SignIn Max</button>
            <button onClick={handleSignUp}>SignUp Phil</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (username, password) =>
            dispatch(actions.SIGN_IN.REQUEST(username, password)),
        handleSignUp: (username, requiredFields, password, rePassword) =>
            dispatch(
                actions.SIGN_UP.REQUEST(
                    username,
                    requiredFields,
                    password,
                    rePassword
                )
            ),
    };
};
export default connect(null, mapDispatchToProps)(Auth);
