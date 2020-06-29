import { createSelector } from "reselect";

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

export const getAuthenticatedUser = createSelector(
    isAuthenticated,
    getUser,
    (isAuthenticated, user) => (isAuthenticated ? user : null)
);
