import { combineReducers } from 'redux'
import { reducer as authReducer } from "../features/auth/slice";

const rootReducer = combineReducers({ auth: authReducer });
export default rootReducer;
