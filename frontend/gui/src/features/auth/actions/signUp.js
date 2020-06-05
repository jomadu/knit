import {
    USERNAME_FIELD,
    USER_PK_FIELD,
    REQUIRED_FIELDS,
} from "../constants";
import { postToJWTCreate, getFromUser, postToUserCreate } from "./apiCalls";
import { call } from "redux-saga/effects";
import { pick } from "lodash";

export const SIGN_UP = "SIGN_UP";

export function* signUpRequestWorker(action) {
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
    const pk = user[USER_PK_FIELD];
    requiredFields = pick(user, REQUIRED_FIELDS);

    return {
        access,
        refresh,
        username,
        pk,
        requiredFields,
    };
}

export const signUpRequestPrepare = (
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


