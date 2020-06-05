import {createSelector} from 'reselect';

export const isAuthenticated = createSelector([(state) => state.jwt, (state) => state.user], (jwt, user) => {
  return jwt && jwt.access && jwt.refresh && user ? true : false;
})