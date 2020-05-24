import * as ActionTypes from "../constants/action-types";
import { updateObject } from "../../utility";

const initialState = {
    token: {
        access: localStorage.getItem("token_access"),
        refresh: localStorage.getItem("token_refresh"),
    },
    loading: false,
    error: null,
};

const authStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const authSuccess = (state, action) => {
    localStorage.setItem("token_access", action.payload.access);
    localStorage.setItem("token_refresh", action.payload.refresh);

    return updateObject(state, {
        token: {
            access: action.payload.access,
            refresh: action.payload.refresh,
        },
        loading: false,
        error: null,
    });
};
const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.payload.error,
    });
};

const authSignOut = (state, action) => {
    localStorage.removeItem("token_access");
    localStorage.removeItem("token_refresh");

    return updateObject(state, {
        token: {
            access: null,
            refresh: null,
        },
        loading: false,
        error: null,
    });
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return authStart(state, action);
        case ActionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case ActionTypes.AUTH_FAIL:
            return authFail(state, action);
        case ActionTypes.AUTH_SIGN_OUT:
            return authSignOut(state, action);
        default:
            return state;
    }
}

export default rootReducer;
