import ReduxSagaSlice from "../../common/ReduxSagaSlice";
import { appName } from "../../app/constants";
import { FEATURE_NAME } from "./constants";

import {
    GET_REPORT_DETAIL,
    getReportDetailRequestWorker,
    getReportDetailRequestPrepare,
    getReportDetailSuccessPrepare,
    getReportDetailSuccessReducer,
} from "./actions/getReportDetail";

let reportReduxSagaSlice = new ReduxSagaSlice(appName, FEATURE_NAME);

// GET_REPORT_DETAIL
reportReduxSagaSlice.addAsyncAction(
    GET_REPORT_DETAIL,
    getReportDetailRequestWorker,
    getReportDetailRequestPrepare,
    getReportDetailSuccessPrepare,
    getReportDetailSuccessReducer,
    undefined
);

export { reportReduxSagaSlice as slice };
export const saga = reportReduxSagaSlice.saga();
export const actions = reportReduxSagaSlice.actions();
export const reducer = reportReduxSagaSlice.reducer();
export default reducer;
