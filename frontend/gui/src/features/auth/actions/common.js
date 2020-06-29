import {pick} from "lodash";
import {USER_FIELDS, LOCAL_STORAGE_ITEMS} from "../constants";
import {merge} from "lodash";

export const signInUpSuccessReducer = (state, action) => {
    const { access, refresh } = action.payload;
    const authUsername = action.payload[USER_FIELDS.AUTH_USERNAME];
    const pk = action.payload[USER_FIELDS.PK];
    const requiredFields = pick(action.payload, USER_FIELDS.REQUIRED);
    localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.ACCESS, access);
    localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.REFRESH, refresh);
    return merge({}, state, {
        jwt: { access, refresh },
        user: {
            [USER_FIELDS.AUTH_USERNAME]: authUsername,
            [USER_FIELDS.PK]: pk,
            ...requiredFields,
        },
    });
};

export const signInUpSuccessPrepare = (
    access,
    refresh,
    authUsername,
    pk,
    requiredFields
) => ({
    payload: {
        access,
        refresh,
        [USER_FIELDS.AUTH_USERNAME]: authUsername,
        [USER_FIELDS.PK]: pk,
        ...requiredFields,
    },
});
