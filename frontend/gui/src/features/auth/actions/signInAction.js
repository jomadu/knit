import {
    USERNAME_FIELD,
    USER_PK_FIELD,
    REQUIRED_FIELDS,
} from "../authConstants";
import { postToJWTCreate, getFromUser } from "./authAPICalls";
import { call } from "redux-saga/effects";
import { pick } from "lodash";

export const SIGN_IN_ACTION_TYPE_BASENAME = "SIGN_IN";

export function* signInRequestWorker(action) {
    const JWTData = yield call(
        postToJWTCreate,
        action.payload[USERNAME_FIELD],
        action.payload.password
    );
    const { access, refresh } = JWTData;
    const user = yield call(getFromUser, access);
    const username = user[USERNAME_FIELD];
    const pk = user[USER_PK_FIELD];
    const requiredFields = pick(user, REQUIRED_FIELDS);

    return { access, refresh, username, pk, requiredFields };
}

export const signInRequestPrepare = (username, password) => ({
    payload: {
        [USERNAME_FIELD]: username,
        password,
    },
});
