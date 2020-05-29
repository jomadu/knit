import { updateObjectProperties } from "../../utility";
import { createSlice } from "@reduxjs/toolkit";
import {
    addReduxSagaAction,
    failureActionReducer,
    failureActionPrepare,
    successActionReducer,
    addSliceReducersForAction,
} from "./utility";
import { pick, omit } from "lodash";

export const SLICE_NAME = "AUTH";
export const USERNAME_FIELD = "email";
export const EMAIL_FIELD = "email";
export const USER_URL_FIELD = "username";
export const REQUIRED_FIELDS = ["username"];
export const USER_PK_NAME = "id";
const LOCAL_STORAGE_ITEMS = {
    JWT: { ACCESS: "jwt/access", REFRESH: "jwt/refresh" },
};

let reduxSagaActions = {};
let sliceReducers = {};

const signInUpSuccessReducer = (state, action) =>
    successActionReducer(state, action, (state, action) => {
        const { access, refresh } = action.payload;
        const username = action.payload[USERNAME_FIELD];
        const pk = action.payload[USER_PK_NAME];
        const requiredFields = pick(action.payload, REQUIRED_FIELDS);
        localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.ACCESS, access);
        localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.REFRESH, refresh);
        return updateObjectProperties(state, {
            jwt: { access, refresh },
            user: {
                [USERNAME_FIELD]: username,
                [USER_PK_NAME]: pk,
                ...requiredFields,
            },
        });
    });

const signInUpSuccessPrepare = (
    access,
    refresh,
    username,
    pk,
    requiredFields
) => ({
    payload: {
        access,
        refresh,
        [USERNAME_FIELD]: username,
        [USER_PK_NAME]: pk,
        ...requiredFields,
    },
});

// SIGN_IN
const signInRequestPrepare = (username, password) => ({
    payload: {
        [USERNAME_FIELD]: username,
        password,
    },
});

addReduxSagaAction(
    reduxSagaActions,
    sliceReducers,
    SLICE_NAME,
    "SIGN_IN",
    signInUpSuccessReducer,
    failureActionReducer,
    signInRequestPrepare,
    signInUpSuccessPrepare,
    failureActionPrepare
);

// SIGN_UP
const signUpRequestPrepare = (
    username,
    requiredFields,
    password,
    rePassword
) => ({
    payload: {
        [USERNAME_FIELD]: username,
        ...requiredFields,
        password,
        rePassword: rePassword,
    },
});

addReduxSagaAction(
    reduxSagaActions,
    sliceReducers,
    SLICE_NAME,
    "SIGN_UP",
    signInUpSuccessReducer,
    failureActionReducer,
    signUpRequestPrepare,
    signInUpSuccessPrepare,
    failureActionPrepare
);

// SIGN_OUT
const signOutRequestReducer = (state, action) =>
    successActionReducer(state, action, (state) => {
        localStorage.removeItem(LOCAL_STORAGE_ITEMS.JWT.ACCESS);
        localStorage.removeItem(LOCAL_STORAGE_ITEMS.JWT.REFRESH);
        return omit(state, ["jwt", "user"]);
    });

addSliceReducersForAction(
    sliceReducers,
    "SIGN_OUT",
    signOutRequestReducer,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
);

// JWT_CREATE
const jwtCreateSuccessReducer = (state, action) =>
    successActionReducer(state, action, (state, action) => {
        const { access, refresh } = action.payload;
        localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.ACCESS, access);
        localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.REFRESH, refresh);
        return updateObjectProperties(state, {
            jwt: { access, refresh },
        });
    });
const jwtCreateRequestPrepare = (username, password) => ({
    payload: {
        [USERNAME_FIELD]: username,
        password,
    },
});
const jwtCreateSuccessPrepare = (access, refresh) => ({
    payload: { access, refresh },
});

addReduxSagaAction(
    reduxSagaActions,
    sliceReducers,
    SLICE_NAME,
    "JWT_CREATE",
    jwtCreateSuccessReducer,
    failureActionReducer,
    jwtCreateRequestPrepare,
    jwtCreateSuccessPrepare,
    failureActionPrepare
);

// GET_USER_INFO
const getUserInfoSuccessReducer = (state, action) =>
    successActionReducer(state, action, (state, action) => {
        const username = action.payload[USERNAME_FIELD];
        const pk = action.payload[USER_PK_NAME];
        const requiredFields = pick(action.payload, REQUIRED_FIELDS);
        return updateObjectProperties(state, {
            user: {
                [USERNAME_FIELD]: username,
                [USER_PK_NAME]: pk,
                ...requiredFields,
            },
        });
    });
const getUserInfoSuccessPrepare = (username, pk, requiredFields) => ({
    payload: {
        [USERNAME_FIELD]: username,
        [USER_PK_NAME]: pk,
        ...requiredFields,
    },
});

addReduxSagaAction(
    reduxSagaActions,
    sliceReducers,
    SLICE_NAME,
    "GET_USER_INFO",
    getUserInfoSuccessReducer,
    failureActionReducer,
    undefined,
    getUserInfoSuccessPrepare,
    failureActionPrepare
);

// Slices
const initialState = {
    jwt: {
        access: localStorage.getItem(LOCAL_STORAGE_ITEMS.JWT.ACCESS),
        refresh: localStorage.getItem(LOCAL_STORAGE_ITEMS.JWT.REFRESH),
    },
};

const slice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: sliceReducers,
});

// Exports

export const actions = {
    ...slice.actions,
    ...reduxSagaActions,
};
export const { reducer } = slice;
