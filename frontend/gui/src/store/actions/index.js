import * as ActionTypes from "../constants/action-types";

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START,
        payload: null,
    };
};

export const authSuccess = (access, refresh) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        payload: {
            access: access,
            refresh: refresh,
        },
    };
};

export const authFail = (error) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        payload: error,
    };
};

export const authSignIn = (email, password) => {
    return {
        type: ActionTypes.AUTH_SIGN_IN,
        payload: {
            email: email,
            password: password,
        },
    };
};

export const authSignUp = (email, username, password, re_password) => {
    return {
        type: ActionTypes.AUTH_SIGN_UP,
        payload: {
            email: email,
            username: username,
            password: password,
            re_password: re_password,
        },
    };
};

export const authSignOut = () => {
    return {
        type: ActionTypes.AUTH_SIGN_OUT,
        payload: null,
    };
};
