import { combineReducers } from 'redux'
import { reducer as authReducer } from "../features/auth/slice";
import { reducer as reportReducer } from "../features/report/slice";

const rootReducer = combineReducers({ auth: authReducer, report: reportReducer });
export default rootReducer;
