import { takeEvery, call, put, all } from "redux-saga/effects";
import { signIn, signUp, start, success, fail } from "../reducers/auth";
import axios from "axios";

function* watchSignIn() {
    yield takeEvery(signIn, signInWorker);
}
function* signInWorker(action) {
    try {
        yield put(start());
        const jwtData = yield call(
            getJWT,
            action.payload.email,
            action.payload.password
        );
        const userData = yield call(
            getUser,
            jwtData.access
        );
        yield put(success(jwtData.access, jwtData.refresh, userData));
    } catch (e) {
        yield put(fail(e));
    }
}
const getJWT = (email, password) => {
    return axios
        .post("http://127.0.0.1:8000/auth/jwt/create/", {
            email: email,
            password: password,
        })
        .then((response) => response.data);
};
const getUser = (access) => {
    return axios.get("http://127.0.0.1:8000/auth/users/me", {
        headers: {
            Authorization: "Bearer " + access
        },
    }).then((response) => response.data);
};

function* watchSignUp() {
    yield takeEvery(signUp, signUpWorker);
}
function* signUpWorker(action) {
    try {
        yield put(start());
        yield call(
            createUser,
            action.payload.email,
            action.payload.username,
            action.payload.password,
            action.payload.re_password
        );
        const jwtData = yield call(
            getJWT,
            action.payload.email,
            action.payload.password
        );
        const userData = yield call(
            getUser,
            jwtData.access
        );
        yield put(success(jwtData.access, jwtData.refresh, userData));
    } catch (e) {
        yield put(fail(e));
    }
}
const createUser = (email, username, password, re_password) => {
    return axios
        .post("http://127.0.0.1:8000/auth/users/", {
            email: email,
            username: username,
            password: password,
            re_password: re_password,
        })
        .then((response) => response.data);
};

export default function* authSaga() {
    yield all([watchSignIn(), watchSignUp()]);
}
