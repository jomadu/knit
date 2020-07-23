import { combineReducers } from 'redux'
import accountReducer from "../features/account2/store/slice";

const rootReducer = combineReducers({ account: accountReducer });
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>


