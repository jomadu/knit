import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import { throttle } from "lodash";
import { composeWithDevTools } from "redux-devtools-extension";

import { loadState, saveState } from "./localStorage";

import rootReducer from "./rootReducer";

const persistedState = loadState();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware().concat(thunk),
    preloadedState: persistedState,
});

store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
