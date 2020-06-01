import { createReducer, createAction } from "@reduxjs/toolkit";
import { all , takeEvery, put, call} from "redux-saga/effects";
import {omit, merge} from "lodash";

export default class ReduxSagaSlice {
    constructor(appName, featureName) {
        this.appName = appName;
        this.featureName = featureName;
        this._actions = { saga: {}, redux: {} };
    }

    actions() {
        let reduxActions = this.reduxActions();
        let sagaActions = this.sagaActions();
        return  merge({}, reduxActions, sagaActions);
    }

    actionCreator(actionType) {
        return this.actions()[actionType];
    }
    reduxActions() {
        let actionCreators = {};
        for (let actionTypeBasename in this._actions.redux) {
            actionCreators[actionTypeBasename] = {};
            for (let actionTypeSuffix in this._actions.redux[actionTypeBasename]){
                actionCreators[actionTypeBasename][actionTypeSuffix] = this._actions.redux[actionTypeBasename][actionTypeSuffix].actionCreator;
            }
        }
        return actionCreators;
    }
    sagaActions() {
        let actionCreators = {};
        for (let actionTypeBasename in this._actions.saga) {
            actionCreators[actionTypeBasename] = {};
            for (let actionTypeSuffix in this._actions.saga[actionTypeBasename]){
                actionCreators[actionTypeBasename][actionTypeSuffix] = this._actions.saga[actionTypeBasename][actionTypeSuffix].actionCreator;
            }
        }
        return actionCreators;
    }
    reducer(initialState = {}) {
        let actionsMap = {};
        for (let actionTypeBasename in this._actions.redux) {

            for (let actionTypeSuffix in this._actions.redux[actionTypeBasename]){
                const actionType = this._actions.redux[actionTypeBasename][actionTypeSuffix].type;
                const reducer = this._actions.redux[actionTypeBasename][actionTypeSuffix].reducer;
                actionsMap[actionType] = reducer;
            }
        }
        console.log("reducer actionsMap", actionsMap);
        return createReducer(initialState, actionsMap);
    }
    saga() {
        let watchers = [];
        for (let actionTypeBasename in this._actions.saga) {
            for (let actionTypeSuffix in this._actions.saga[actionTypeBasename]){
                watchers.push(this._actions.saga[actionTypeBasename][actionTypeSuffix].watcher());
            }
        }
        return function* () {
            yield all(watchers);
        };
    }

    slicePrefix() {
        return `${this.appName}/${this.featureName}/`;
    }
    actionTypes(actionTypeBasename) {
        const basename = `${this.slicePrefix()}${actionTypeBasename}`;
        return {
            REQUEST: `${basename}/REQUEST`,
            SUCCESS: `${basename}/SUCCESS`,
            FAILURE: `${basename}/FAILURE`,
        };
    }
    actionErrorName(actionTypeBasename) {
        return `${this.slicePrefix()}${actionTypeBasename}/ERROR`;
    }
    actionBasename(actionType) {
        let basename = actionType;
        // Trim action type
        if (basename.endsWith("/REQUEST")) {
            basename = basename.substr(0, basename.lastIndexOf("/REQUEST"));
        } else if (basename.endsWith("/SUCCESS")) {
            basename = basename.substr(0, basename.lastIndexOf("/SUCCESS"));
        } else if (basename.endsWith("/FAILURE")) {
            basename = basename.substr(0, basename.lastIndexOf("/FAILURE"));
        }

        // Trim slice prefix
        if (basename.startsWith(this.slicePrefix())) {
            basename = basename.substr(this.slicePrefix().length);
        }
        return basename;
    }

    deleteActionError(state, action) {
        return omit(
            state,
            this.actionErrorName(this.actionBasename(action.type))
        );
    }
    updateActionError(state, action) {
        console.log("updateActionError ", {
            [this.actionErrorName(this.actionBasename(action.type))]: action
                .payload,
        }); 
        return merge({}, state, {
            [this.actionErrorName(this.actionBasename(action.type))]: action
                .payload,
        });
    }

    successActionReducer(state, action, extraReducer) {
        const deletedActionError = this.deleteActionError(state, action);
        return extraReducer
            ? extraReducer(deletedActionError, action)
            : deletedActionError;
    }

    failureActionReducer(state, action, extraReducer) {
        const updatedActionError = this.updateActionError(state, action);
        return extraReducer
            ? extraReducer(updatedActionError, action)
            : updatedActionError;
    }

    createRequestWatcher(requestActionType, requestWorker){
        return function* () {
            yield takeEvery(requestActionType, requestWorker);
        }
    }
    createRequestWorker(
        requestWorker,
        successActionCreator,
        failureActionCreator
    ) {
        return function* (action) {
            try {
                const successData = yield call(requestWorker,action);
                yield put(successActionCreator(...successData));
            } catch (e) {
                yield put(failureActionCreator(e));
            }
        };
    }

    addSagaAction(
        actionTypeBasename,
        requestWorker,
        requestPrepare,
        successPrepare,
        successReducer,
        failurePrepare,
        failureReducer
    ) {
        this._actions.redux[actionTypeBasename] = {};
        this._actions.saga[actionTypeBasename] = {};

        const types = this.actionTypes(actionTypeBasename);
        this._actions.redux[actionTypeBasename]["SUCCESS"] = {
            type: types.SUCCESS,
            actionCreator: createAction(types.SUCCESS, successPrepare),
            reducer: (state, action) =>
                this.successActionReducer(state, action, successReducer),
        };
        this._actions.redux[actionTypeBasename]["FAILURE"] = {
            type: types.FAILURE,
            actionCreator: createAction(types.FAILURE, failurePrepare),
            reducer: (state, action) =>
                this.failureActionReducer(state, action, failureReducer),
        };
        const worker = this.createRequestWorker(
            requestWorker,
            this._actions.redux[actionTypeBasename]["SUCCESS"].actionCreator,
            this._actions.redux[actionTypeBasename]["FAILURE"].actionCreator
        );
        const watcher = this.createRequestWatcher(types.REQUEST, worker);
        this._actions.saga[actionTypeBasename]["REQUEST"] = {
            type: types.REQUEST,
            actionCreator: createAction(types.REQUEST, requestPrepare),
            watcher,
            worker
        };
    }

    addReduxAction(
        actionTypeBasename,
        requestPrepare,
        requestReducer,
        successPrepare,
        successReducer,
        failurePrepare,
        failureReducer
    ) {
        this._actions.redux[actionTypeBasename] = {};

        const types = this.actionTypes(actionTypeBasename);
        this._actions.redux[actionTypeBasename]["REQUEST"] = {
            type: types.REQUEST,
            actionCreator: createAction(types.REQUEST, requestPrepare),
            reducer: requestReducer,
        };
        this._actions.redux[actionTypeBasename]["SUCCESS"] = {
            type: types.SUCCESS,
            actionCreator: createAction(types.SUCCESS, successPrepare),
            reducer: (state, action) =>
                this.successActionReducer(state, action, successReducer),
        };
        this._actions.redux[actionTypeBasename]["FAILURE"] = {
            type: types.FAILURE,
            actionCreator: createAction(types.FAILURE, failurePrepare),
            reducer: (state, action) =>
                this.failureActionReducer(state, action, failureReducer),
        };
    }
}
