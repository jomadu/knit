import { createSelector } from "reselect";

const getJWT = (state) => state.jwt;
const getUser = (state) => state.user;

export const isAuthenticated = createSelector([getJWT, getUser], (jwt, user) => {
    return jwt && jwt.access && jwt.refresh && user ? true : false;
});


export default isAuthenticated;
