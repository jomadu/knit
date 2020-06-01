import ReduxSagaSlice from "../../common/ReduxSagaSlice";
import { APP_NAME } from "../../app/appConstants";
import { FEATURE_NAME } from "./authConstants";
import {
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
} from "./actions/authCommon";

import {
    ACTION_TYPE_BASENAME as signInActionTypeBasename,
    requestWorker as signInRequestWorker,
    requestPrepare as signInRequestPrepare,
} from "./actions/signInAction";


let authReduxSagaSlice = new ReduxSagaSlice(APP_NAME, FEATURE_NAME);

// SIGN_IN
authReduxSagaSlice.addSagaAction(
    signInActionTypeBasename,
    signInRequestWorker,
    signInRequestPrepare,
    signInUpSuccessPrepare,
    signInUpSuccessReducer,
    undefined,
    undefined
);

export {authReduxSagaSlice as slice};
export const saga = authReduxSagaSlice.saga();
export const actions = authReduxSagaSlice.actions();
export const reducer = authReduxSagaSlice.reducer();
export default reducer;
