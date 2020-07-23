import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { updateCommunicationState } from "../../../common/utilities";
import {
    IFeatureStateBase,
    featureInitalStateBase,
    CommunicationActionStatus,
} from "../../../common/constants";
import { RootState } from "../../../app/rootReducer";
import { featureName, userFields } from "../constants";
import { postToJWTCreate, getFromUser, postToUserCreate } from "./api";

// Thunks
interface SignUpArguments {
    authUsername: string;
    username: string;
    password: string;
    rePassword: string;
}
interface SignUpResolution {
    access: string;
    refresh: string;
    id: number;
    authUsername: string;
    username: string;
    email: string;
}

export const signUp = createAsyncThunk(
    featureName + "/signUp",
    async ({ authUsername, username, password, rePassword }: SignUpArguments) => {
        await postToUserCreate(authUsername, username, password, rePassword);
        const { access, refresh } = await postToJWTCreate(
            authUsername,
            password
        );
        const user = await getFromUser(access);
        const id = user[userFields.id];
        const email = user[userFields.email];

        return {
            access,
            refresh,
            id,
            authUsername,
            username,
            email,
        } as SignUpResolution;
    }
);

interface SignInArguments {
    authUsername: string;
    password: string;
}
interface SignInResolution {
    access: string;
    refresh: string;
    id: number;
    authUsername: string;
    username: string;
    email: string;
}

export const signIn = createAsyncThunk(
    featureName + "/signIn",
    async ({ authUsername, password }: SignInArguments) => {
        const { access, refresh } = await postToJWTCreate(
            authUsername,
            password
        );
        const user = await getFromUser(access);
        const id = user[userFields.id];
        const username = user[userFields.username];
        const email = user[userFields.email];

        return {
            access,
            refresh,
            id,
            authUsername,
            username,
            email,
        } as SignInResolution;
    }
);
// Slice
interface AccountSessionState {
    user: {
        id: number | null;
        authUsername: string | null;
        username: string | null;
        email: string | null;
        permissions: {
            jwt: {
                access: string | null;
                refresh: string | null;
            };
        };
    };
}
interface AccountState extends IFeatureStateBase {
    session: AccountSessionState;
}

const accountSessionInitialState: AccountSessionState = {
    user: {
        id: null,
        authUsername: null,
        username: null,
        email: null,
        permissions: {
            jwt: {
                access: null,
                refresh: null,
            },
        },
    },
};

const initialState: AccountState = Object.assign({}, featureInitalStateBase, {
    session: accountSessionInitialState,
});

export const jwtSelector = createSelector(
    (state: RootState) => state[featureName].session.user.permissions.jwt,
    (jwt) => jwt
);
export const isAuthenticatedSelector = createSelector(
    jwtSelector,
    (jwt) => jwt.access && jwt.refresh
);
export const usernameSelector = createSelector(
    (state: RootState) => state[featureName].session.user.username,
    (username) => username
);

const accountsSlice = createSlice({
    name: featureName,
    initialState: initialState,
    reducers: {
        signOut: (state) => {
            state.session = accountSessionInitialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            updateCommunicationState(state.communication, {
                type: signIn.typePrefix,
                status: CommunicationActionStatus.pending,
                error: null,
            });
        });
        builder.addCase(signIn.fulfilled, (state, { payload }) => {
            const {
                access,
                refresh,
                id,
                authUsername,
                username,
                email,
            } = payload;
            state.session.user = {
                id,
                authUsername,
                username,
                email,
                permissions: { jwt: { access, refresh } },
            };

            updateCommunicationState(state.communication, {
                type: signIn.typePrefix,
                status: CommunicationActionStatus.fulfilled,
                error: null,
            });
        });
        builder.addCase(signIn.rejected, (state, { error }) => {
            updateCommunicationState(state.communication, {
                type: signIn.typePrefix,
                status: CommunicationActionStatus.rejected,
                error: error,
            });
        });

        builder.addCase(signUp.pending, (state) => {
            updateCommunicationState(state.communication, {
                type: signUp.typePrefix,
                status: CommunicationActionStatus.pending,
                error: null,
            });
        });
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            const {
                access,
                refresh,
                id,
                authUsername,
                username,
                email,
            } = payload;
            state.session.user = {
                id,
                authUsername,
                username,
                email,
                permissions: { jwt: { access, refresh } },
            };

            updateCommunicationState(state.communication, {
                type: signUp.typePrefix,
                status: CommunicationActionStatus.fulfilled,
                error: null,
            });
        });
        builder.addCase(signUp.rejected, (state, { error }) => {
            updateCommunicationState(state.communication, {
                type: signUp.typePrefix,
                status: CommunicationActionStatus.rejected,
                error: error,
            });
        });
    },
});

// Exports
const { actions, reducer } = accountsSlice;
export const { signOut } = actions;
export default reducer;
