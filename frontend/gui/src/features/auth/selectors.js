import { createSelector } from "reselect";
import { USER_FIELDS } from "./constants";

export const isAuthenticated = createSelector(
    (state) => state.auth.jwt,
    (state) => state.user,
    (jwt, user) => {
        return jwt && jwt.access && jwt.refresh ? true : false;
    }
);
export const getUser = createSelector(
    (state) => state.auth.user,
    (user) => user
);

export const getUserAuthUsernameField = createSelector(
    (state) => state.auth.user,
    (user) => user && user[USER_FIELDS.AUTH_USERNAME]
);
export const getUserUsernameField = createSelector(
    (state) => state.auth.user,
    (user) => user && user[USER_FIELDS.USERNAME]
);
export const getUserEmailField = createSelector(
    (state) => state.auth.user,
    (user) => user && user[USER_FIELDS.EMAIL]
);
export const getUserPKFeild = createSelector(
    (state) => state.auth.user,
    (user) => user && user[USER_FIELDS.PK]
);
export const getUserRequiredField = createSelector(
    (state) => state.auth.user,
    (user) => user && user[USER_FIELDS.REQUIRED]
);
