import { takeEvery, call, put, all } from "redux-saga/effects";
import * as Actions from "../actions/index";
import * as ActionTypes from "../constants/action-types";
import axios from "axios";

function* watchauthSignIn() {
    yield takeEvery(ActionTypes.AUTH_SIGN_IN, authSignIn);
}
function* authSignIn(action) {
    try {
        yield put(Actions.authStart());
        const data = yield call(
            createJWT,
            action.payload.email,
            action.payload.password
        );
        yield put(Actions.authSuccess(data.access, data.refresh));
    } catch (e) {
        yield put(Actions.authFail(e));
    }
}
function createJWT(email, password) {
    return axios
        .post("http://127.0.0.1:8000/auth/jwt/create/", {
            email: email,
            password: password,
        })
        .then((response) => response.data);
}

function* watchauthSignUp() {
    yield takeEvery(ActionTypes.AUTH_SIGN_UP, authSignUp);
}
function* authSignUp(action) {
    try {
        yield put(Actions.authStart());
        yield call(
            signup,
            action.payload.email,
            action.payload.username,
            action.payload.password,
            action.payload.re_password
        );
        const jwt_data = yield call(
            createJWT,
            action.payload.email,
            action.payload.password
        );
        yield put(Actions.authSuccess(jwt_data.access, jwt_data.refresh));
    } catch (e) {
        yield put(Actions.authFail(e));
    }
}
function signup(email, username, password, re_password) {
    // console.log({
    //     email: email,
    //     username: username,
    //     password: password,
    //     re_password: re_password,
    // });
    return axios
        .post("http://127.0.0.1:8000/auth/users/", {
            email: email,
            username: username,
            password: password,
            re_password: re_password,
        })
        .then((response) => response.data);
}

export default function* authSaga() {
    yield all([watchauthSignIn(), watchauthSignUp()]);
}
