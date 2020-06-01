import React from "react";
import { connect } from "react-redux";
import { actions } from "../authSlice";

const Auth = (props) => {
    const handleSignIn = (username, password) =>
        props.handleSignIn("maxdunn123@gmail.com", "flashyCactus68!");
    return (
        <div>
            <div>Hello World</div>
            <button onClick={handleSignIn}>SignIn Max</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (username, password) =>
            dispatch(actions.SIGN_IN.REQUEST(username, password)),
    };
};
export default connect(null, mapDispatchToProps)(Auth);
