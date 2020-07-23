import { combineReducers } from 'redux'
import authReducer from "../features/auth/store/slice";
import {featureName as authFeatureName} from "../features/auth/constants";

const rootReducer = combineReducers({ [authFeatureName]: authReducer });
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>


