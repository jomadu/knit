// --------
// Imports
// --------
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { FeatureState, initialFeatureState, Status, Error } from "../constants";
import { RootState } from "../../app/rootReducer";

// --------
// Constants
// --------
export const USER = "user";

// --------
// Thunks
// --------

const testUserData1: UserData = {
  id: 1,
  authUsername: "maxdunn123@gmail.com",
  username: "maxdunn123",
  email: "maxdunn123@gmail.com",
  jwt: {
    access: "myAccessToken",
    refresh: "myRefreshToken",
  },
};

const testUserData2: UserData = {
  id: 2,
  authUsername: "bcalloway@gmail.com",
  username: "becnasty",
  email: "bcalloway@gmail.com",
  jwt: {
    access: "bcAccessToken",
    refresh: "bcRefreshToken",
  },
};

export interface SignInArg {
  authUsername: string;
  password: string;
}
export interface SignInRes {
  userData: UserData;
}

export const signIn = createAsyncThunk<SignInRes, SignInArg>(
  `${USER}/signIn`,
  async (arg) => {
    return { userData: testUserData1 };
    //   return axios
    //     .get("endpoint", createAxiosAuthConfig(thunkApi.extra.jwt))
    //     .then((response) => response.data);
  }
);

export interface SignUpArg {
  authUsername: string;
  username: string;
  password: string;
  rePassword: string;
}
export interface SignUpRes {
  userData: UserData;
}
export const signUp = createAsyncThunk<SignUpRes, SignUpArg>(
  `${USER}/signUp`,
  async (arg) => {
    return { userData: testUserData2 };
  }
);

// --------
// State
// --------

export interface JWT {
  access: string;
  refresh: string;
}

interface UserData {
  id: number | null;
  authUsername: string | null;
  username: string | null;
  email: string | null;
  jwt: JWT | null;
}

interface User {
  data: UserData | null;
  status: Status;
  error: Error;
}

const initialUser: User = {
  data: null,
  status: Status.idle,
  error: null,
};

interface UserSessionState {
  user: User;
}
const initialUserSessionState: UserSessionState = {
  user: initialUser,
};
interface UserState extends FeatureState {
  entities: null;
  session: UserSessionState;
}
const initialUserState: UserState = Object.assign({}, initialFeatureState, {
  entities: null,
  session: initialUserSessionState,
});

// --------
// Selectors
// --------

export const userFeatureSelector = (state: RootState) => state.user;
export const userSelector = createSelector(
  userFeatureSelector,
  (state: UserState) => state.session.user
);
export const userDataSelector = createSelector(
  userSelector,
  (user) => user?.data
);
export const userIdSelector = createSelector(
  userDataSelector,
  (data) => data?.id
);
export const userAuthUsernameSelector = createSelector(
  userDataSelector,
  (data) => data?.authUsername
);
export const userUsernameSelector = createSelector(
  userDataSelector,
  (data) => data?.username
);
export const userEmailSelector = createSelector(
  userDataSelector,
  (data) => data?.email
);
export const userJWTSelector = createSelector(
  userDataSelector,
  (data) => data?.jwt
);
export const isAuthenticatedSelector = createSelector(
  userJWTSelector,
  (jwt) => typeof jwt !== "undefined"
);

// --------
// Slice
// --------
const slice = createSlice({
  name: USER,
  initialState: initialUserState,
  reducers: {
    signOut: (state) => {
      state.session.user = Object.assign({}, initialUser, {
        status: Status.fulfilled,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      state.session.user.status = Status.pending;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.session.user.data = payload.userData;
      state.session.user.status = Status.fulfilled;
    });
    builder.addCase(signIn.rejected, (state, { error }) => {
      state.session.user.error = error;
      state.session.user.status = Status.rejected;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.session.user.status = Status.pending;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.session.user.data = payload.userData;
      state.session.user.status = Status.fulfilled;
    });
    builder.addCase(signUp.rejected, (state, { error }) => {
      state.session.user.error = error;
      state.session.user.status = Status.rejected;
    });
  },
});
const { actions, reducer } = slice;
export const { signOut } = actions;
export default reducer;

// --------
// Utilities
// --------
export const createAxiosJWTHeader = (jwt: JWT) => ({
  Authorization: "Bearer " + jwt.access,
});

export const createAxiosAuthConfig = (jwt: JWT) => ({
  headers: createAxiosJWTHeader(jwt),
});
