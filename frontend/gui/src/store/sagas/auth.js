import { takeEvery, call, put, all } from "redux-saga/effects";
// import { signIn, signUp, start, signedIn, fail } from "../reducers/auth";
import {
    actions,
    USERNAME_FIELD,
    REQUIRED_FIELDS,
    USER_PK_NAME,
} from "../reducers/auth";
import axios from "axios";
import { backend } from "../../routes/urls";
import { pick } from "lodash";

function* watchSignInRequest() {
    yield takeEvery(actions.SIGN_IN_REQUEST, signInRequestWorker);
}
function* signInRequestWorker(action) {
    try {
        const { access, refresh } = yield call(
            postToJWTCreate,
            action.payload[USERNAME_FIELD],
            action.payload.password
        );
        const user = yield call(getFromUser, access);
        const username = user[USERNAME_FIELD];
        const pk = user[USER_PK_NAME];
        const requiredFields = pick(user, REQUIRED_FIELDS);

        yield put(
            actions.SIGN_IN_SUCCESS(
                access,
                refresh,
                username,
                pk,
                requiredFields
            )
        );
    } catch (e) {
        yield put(actions.SIGN_IN_FAILURE(e));
    }
}

function* watchSignUpRequest() {
    yield takeEvery(actions.SIGN_UP_REQUEST, signUpRequestWorker);
}
function* signUpRequestWorker(action) {
    try {
        let requiredFields = pick(action.payload, REQUIRED_FIELDS);
        yield call(
            postToUserCreate,
            action.payload[USERNAME_FIELD],
            requiredFields,
            action.payload.password,
            action.payload.rePassword
        );
        const { access, refresh } = yield call(
            postToJWTCreate,
            action.payload[USERNAME_FIELD],
            action.payload.password
        );
        const user = yield call(getFromUser, access);
        const username = user[USERNAME_FIELD];
        const pk = user[USER_PK_NAME];
        requiredFields = pick(user, REQUIRED_FIELDS);

        yield put(
            actions.SIGN_UP_SUCCESS(
                access,
                refresh,
                username,
                pk,
                requiredFields
            )
        );
    } catch (e) {
        yield put(actions.SIGN_UP_FAILURE(e));
    }
}

function* watchJWTCreateRequest() {
    yield takeEvery(actions.JWT_CREATE_REQUEST, jwtCreateRequestWorker);
}
function* jwtCreateRequestWorker(action) {
    try {
        const { access, refresh } = yield call(
            postToJWTCreate,
            action.payload[USERNAME_FIELD],
            action.payload.password
        );
        yield put(actions.JWT_CREATE_SUCCESS(access, refresh));
    } catch (e) {
        yield put(actions.JWT_CREATE_FAILURE(e));
    }
}

const postToJWTCreate = (username, password) => {
    return axios
        .post(backend.djoser.jwtCreate, {
            [USERNAME_FIELD]: username,
            password: password,
        })
        .then((response) => response.data);
};
const getFromUser = (access) => {
    return axios
        .get(backend.djoser.user, {
            headers: {
                Authorization: "Bearer " + access,
            },
        })
        .then((response) => response.data);
};

const postToUserCreate = (username, requiredFields, password, rePassword) => {
    return axios
        .post(backend.djoser.userCreate, {
            [USERNAME_FIELD]: username,
            ...requiredFields,
            password: password,
            re_password: rePassword,
        })
        .then((response) => response.data);
};

export default function* authSaga() {
    yield all([
        watchSignInRequest(),
        watchSignUpRequest(),
        watchJWTCreateRequest(),
    ]);
}
