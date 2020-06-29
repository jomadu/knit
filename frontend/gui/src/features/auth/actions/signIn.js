import {
    USER_FIELDS,
} from "../constants";
import { postToJWTCreate, getFromUser } from "./apiCalls";
import { call } from "redux-saga/effects";
import { pick } from "lodash";

export const SIGN_IN = "SIGN_IN";

export function* signInRequestWorker(action) {
    const JWTData = yield call(
        postToJWTCreate,
        action.payload[USER_FIELDS.AUTH_USERNAME],
        action.payload.password
    );
    const { access, refresh } = JWTData;
    const user = yield call(getFromUser, access);
    const authUsername = user[USER_FIELDS.AUTH_USERNAME];
    const pk = user[USER_FIELDS.PK];
    const requiredFields = pick(user, USER_FIELDS.REQUIRED);

    return { access, refresh, authUsername, pk, requiredFields };
}

export const signInRequestPrepare = (authUsername, password) => ({
    payload: {
        [USER_FIELDS.AUTH_USERNAME]: authUsername,
        password,
    },
});
