import { combineReducers } from "@reduxjs/toolkit";
import { REPORT } from "../features/report/duck";
import { USER } from "../features/user/duck";
import reportReducer from "../features/report/duck";
import userReducer from "../features/user/duck";

const rootReducer = combineReducers({
  [REPORT]: reportReducer,
  [USER]: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
