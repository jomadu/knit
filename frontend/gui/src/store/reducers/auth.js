import { updateObject } from "../../utility";
import { createSlice, createAction } from "@reduxjs/toolkit";

export const signIn = createAction("auth/signIn", (email, password) => ({
    payload: { email: email, password: password },
}));

export const signUp = createAction(
    "auth/signUp",
    (email, username, password, re_password) => ({
        payload: {
            email: email,
            username: username,
            password: password,
            re_password: re_password,
        },
    })
);

export const getUser = createAction("auth/getUser");

const initialState = {
    token: {
        access: localStorage.getItem("token_access"),
        refresh: localStorage.getItem("token_refresh"),
    },
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        signOut: (state, action) => {
            localStorage.removeItem("token_access");
            localStorage.removeItem("token_refresh");

            return updateObject(state, {
                token: {
                    access: null,
                    refresh: null,
                },
                user: null,
                loading: false,
                error: null,
            });
        },
        start: (state, action) => {
            return updateObject(state, {
                loading: true,
                error: null,
            });
        },
        signedIn: {
            reducer: (state, action) => {
                localStorage.setItem("token_access", action.payload.access);
                localStorage.setItem("token_refresh", action.payload.refresh);
                return updateObject(state, {
                    token: {
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                    },
                    user: action.payload.user,
                    loading: false,
                    error: null,
                });
            },
            prepare: (access, refresh, user) => ({
                payload: {
                    access: access,
                    refresh: refresh,
                    user: user,
                }
            })
        },
        fail: (state, action) => {
            return updateObject(state, {
                loading: false,
                error: action.payload.error,
            });
        },
    },
});

const { actions, reducer } = authSlice;
export const { signOut, start, signedIn, fail } = actions;
export default reducer;
