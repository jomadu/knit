import {pick} from "lodash";
import {USER_PK_FIELD, USERNAME_FIELD, LOCAL_STORAGE_ITEMS, REQUIRED_FIELDS} from "../constants";
import {merge} from "lodash";

export const signInUpSuccessReducer = (state, action) => {
    const { access, refresh } = action.payload;
    const username = action.payload[USERNAME_FIELD];
    const pk = action.payload[USER_PK_FIELD];
    const requiredFields = pick(action.payload, REQUIRED_FIELDS);
    localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.ACCESS, access);
    localStorage.setItem(LOCAL_STORAGE_ITEMS.JWT.REFRESH, refresh);
    return merge({}, state, {
        jwt: { access, refresh },
        user: {
            [USERNAME_FIELD]: username,
            [USER_PK_FIELD]: pk,
            ...requiredFields,
        },
    });
};

export const signInUpSuccessPrepare = (
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
        [USER_PK_FIELD]: pk,
        ...requiredFields,
    },
});
