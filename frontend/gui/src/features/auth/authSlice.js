import ReduxSagaSlice from "../../common/ReduxSagaSlice";
import { APP_NAME } from "../../app/appConstants";
import { FEATURE_NAME } from "./authConstants";
import {
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
} from "./actions/authCommon";

import {
    SIGN_IN_ACTION_TYPE_BASENAME,
    signInRequestWorker,
    signInRequestPrepare,
} from "./actions/signInAction";

import {
    SIGN_UP_ACTION_TYPE_BASENAME,
    signUpRequestWorker,
    signUpRequestPrepare,
} from "./actions/signUpAction";


let authReduxSagaSlice = new ReduxSagaSlice(APP_NAME, FEATURE_NAME);

// SIGN_IN
authReduxSagaSlice.addAsyncAction(
    SIGN_IN_ACTION_TYPE_BASENAME,
    signInRequestWorker,
    signInRequestPrepare,
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
    undefined
);
// SIGN_UP
authReduxSagaSlice.addAsyncAction(
    SIGN_UP_ACTION_TYPE_BASENAME,
    signUpRequestWorker,
    signUpRequestPrepare,
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
    undefined
);


export {authReduxSagaSlice as slice};
export const saga = authReduxSagaSlice.saga();
export const actions = authReduxSagaSlice.actions();
export const reducer = authReduxSagaSlice.reducer();
export default reducer;
