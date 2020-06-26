import { combineReducers } from 'redux'
import { reducer as authReducer } from "../features/auth/slice";
import { reducer as navReducer } from "../features/nav/slice";

const rootReducer = combineReducers({ auth: authReducer, nav: navReducer });
export default rootReducer;
