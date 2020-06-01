import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import rootReducer from './rootReducer';
import rootSaga from "./rootSaga";

const initializeSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(initializeSagaMiddleware))
);

initializeSagaMiddleware.run(rootSaga);

export default store;