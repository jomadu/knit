import { createSelector } from "reselect";

const getToken = (state) => state.token;
const getUser = (state) => state.user;

export const isAuthenticated = createSelector([getToken, getUser], (token, user) => {
    return token && token.access && token.refresh && user ? true : false;
});


export default isAuthenticated;
