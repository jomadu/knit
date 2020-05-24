import { createSelector } from "reselect";

const getToken = (state) => state.token;

export const isAuthenticated = createSelector([getToken], (token) => {
    return token.access != null && token.refresh != null;
});

export default isAuthenticated;
