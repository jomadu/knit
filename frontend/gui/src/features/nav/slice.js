import ReduxSagaSlice from "../../common/ReduxSagaSlice";
import { APP_NAME } from "../../app/constants";
import { FEATURE_NAME } from "./constants";

import {
    OPEN_DRAWER,
    openDrawerReducer,
} from "./actions/openDrawer";

import {
  CLOSE_DRAWER,
  closeDrawerReducer,
} from "./actions/closeDrawer";

let navReduxSagaSlice = new ReduxSagaSlice(APP_NAME, FEATURE_NAME);

navReduxSagaSlice.addAction(OPEN_DRAWER, undefined, openDrawerReducer);
navReduxSagaSlice.addAction(CLOSE_DRAWER, undefined, closeDrawerReducer);

export { navReduxSagaSlice as slice };
export const saga = navReduxSagaSlice.saga();
export const actions = navReduxSagaSlice.actions();
export const reducer = navReduxSagaSlice.reducer();
export default reducer;

