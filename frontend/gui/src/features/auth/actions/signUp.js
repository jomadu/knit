import {
    USER_FIELDS,
} from "../constants";
import { postToJWTCreate, getFromUser, postToUserCreate } from "./apiCalls";
import { call } from "redux-saga/effects";
import { pick } from "lodash";

export const SIGN_UP = "SIGN_UP";

export function* signUpRequestWorker(action) {
    let requiredFields = pick(action.payload, USER_FIELDS.REQUIRED);
    yield call(
        postToUserCreate,
        action.payload[USER_FIELDS.AUTH_USERNAME],
        requiredFields,
        action.payload.password,
        action.payload.rePassword
    );
    const { access, refresh } = yield call(
        postToJWTCreate,
        action.payload[USER_FIELDS.AUTH_USERNAME],
        action.payload.password
    );
    const user = yield call(getFromUser, access);
    const authUsername = user[USER_FIELDS.AUTH_USERNAME];
    const pk = user[USER_FIELDS.PK];
    requiredFields = pick(user, USER_FIELDS.REQUIRED);

    return {
        access,
        refresh,
        authUsername,
        pk,
        requiredFields,
    };
}

export const signUpRequestPrepare = (
    authUsername,
    requiredFields,
    password,
    rePassword
) => ({
    payload: {
        [USER_FIELDS.AUTH_USERNAME]: authUsername,
        ...requiredFields,
        password,
        rePassword: rePassword,
    },
});


