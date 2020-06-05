import ReduxSagaSlice from "../../common/ReduxSagaSlice";
import { APP_NAME } from "../../app/constants";
import { FEATURE_NAME } from "./constants";
import {
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
} from "./actions/common";

import {
    SIGN_IN,
    signInRequestWorker,
    signInRequestPrepare,
} from "./actions/signIn";

import {
    SIGN_UP,
    signUpRequestWorker,
    signUpRequestPrepare,
} from "./actions/signUp";
import { SIGN_OUT, signOutRequestReducer } from "./actions/signOut";

let authReduxSagaSlice = new ReduxSagaSlice(APP_NAME, FEATURE_NAME);

// SIGN_IN
authReduxSagaSlice.addAsyncAction(
    SIGN_IN,
    signInRequestWorker,
    signInRequestPrepare,
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
    undefined
);
// SIGN_UP
authReduxSagaSlice.addAsyncAction(
    SIGN_UP,
    signUpRequestWorker,
    signUpRequestPrepare,
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
    undefined
);

// SIGN_OUT
authReduxSagaSlice.addAction(
    SIGN_OUT,
    undefined,
    signOutRequestReducer,
    undefined,
    undefined
);

export { authReduxSagaSlice as slice };
export const saga = authReduxSagaSlice.saga();
export const actions = authReduxSagaSlice.actions();
export const reducer = authReduxSagaSlice.reducer();
export default reducer;
