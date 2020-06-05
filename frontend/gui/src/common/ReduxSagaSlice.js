import { createReducer, createAction } from "@reduxjs/toolkit";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { omit, merge } from "lodash";

/*
This class maintains actions creators, sagas, and reducers

Each added action has three related subactions:
1. REQUEST - triggers the action
2. SUCCESS - Indicates a successful request. Always reduced in the redux reducer. Will clear the action error in state
3. FAILURE - Indicates a failed request. Always reduced in the redux reducer.

Each added action has one related state error. For example, for the given configuration:
{
    APP_NAME: "MY_APP",
    FEATURE_NAME: "MY_FEATURE",
    actionTypeBasename: "MY_ACTION",
}


``` Example of creating a synchronous action
const reduxSagaSlice = new ReduxSagaSlice("MY_APP", "MY_FEATURE");

const prepare = (newValue1, newValue2) => ({ payload: { newValue1, newValue2 }})
const reducer = (state, action) => {
    const { newValue1, newValue2 } = action.payload;
    return { 
        ...state, 
        newValue1,
        newValue2,
    };
}
const successReducer = (state, action) => {
    return {
        ...state, mySuccessFlag: true, myFailureFlag: false
    }
}
const failureReducer = (state, action) => {
    return {
        ...state, mySuccessFlag: false, myFailureFlag: true
    }
}
reduxSagaSlice.addAction(actionTypeBasename,
        prepare,
        reducer,
        successReducer,
        failureReducer)

console.log("actionTypes:", ReduxSagaSlice.actionTypes(ReduxSagaSlice))
```
```Output


Types of actions:
1. Redux Action - REQUEST is reduced in a redux reducer

2. Saga Action

Example:


*/
const SYNC = "SYNC";
const REQUEST = "ASYNC_REQUEST";
const SUCCESS = "ASYNC_SUCCESS";
const FAILURE = "ASYNC_FAILURE";
const ERROR = "ERROR";

export default class ReduxSagaSlice {
    constructor(appName, featureName) {
        this.appName = appName;
        this.featureName = featureName;
        this._actions = {};
    }

    actions() {
        let actionCreators = {};
        for (let actionTypeBasename in this._actions) {
            actionCreators[actionTypeBasename] = {};
            for (let actionTypeSuffix in this._actions[actionTypeBasename]) {
                if (
                    this._actions[actionTypeBasename][actionTypeSuffix]
                        .actionCreator
                ) {
                    actionCreators[actionTypeBasename][
                        actionTypeSuffix
                    ] = this._actions[actionTypeBasename][
                        actionTypeSuffix
                    ].actionCreator;
                }
            }
        }
        return actionCreators;
    }
    reducer(initialState = {}) {
        let actionsMap = {};
        for (let actionTypeBasename in this._actions) {
            for (let actionTypeSuffix in this._actions[actionTypeBasename]) {
                if (
                    this._actions[actionTypeBasename][actionTypeSuffix].reducer
                ) {
                    const actionType = this._actions[actionTypeBasename][
                        actionTypeSuffix
                    ].type;
                    const reducer = this._actions[actionTypeBasename][
                        actionTypeSuffix
                    ].reducer;
                    actionsMap[actionType] = reducer;
                }
            }
        }
        return createReducer(initialState, actionsMap);
    }
    saga() {
        let watchers = [];
        for (let actionTypeBasename in this._actions) {
            for (let actionTypeSuffix in this._actions[actionTypeBasename]) {
                if (
                    this._actions[actionTypeBasename][actionTypeSuffix].watcher
                ) {
                    watchers.push(
                        this._actions[actionTypeBasename][
                            actionTypeSuffix
                        ].watcher()
                    );
                }
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
        const prefixed = `${this.slicePrefix()}${actionTypeBasename}`;
        return {
            [SYNC]: `${prefixed}/${SYNC}`,
            [REQUEST]: `${prefixed}/${REQUEST}`,
            [SUCCESS]: `${prefixed}/${SUCCESS}`,
            [FAILURE]: `${prefixed}/${FAILURE}`,
        };
    }
    actionErrorName(actionTypeBasename) {
        return `${this.slicePrefix()}${actionTypeBasename}/${ERROR}`;
    }
    actionBasename(actionType) {
        let basename = actionType;
        // Trim action type
        if (basename.endsWith(`/${SYNC}`)) {
            basename = basename.substr(0, basename.lastIndexOf(`/${SYNC}`));
        } else if (basename.endsWith(`/${REQUEST}`)) {
            basename = basename.substr(0, basename.lastIndexOf(`/${REQUEST}`));
        } else if (basename.endsWith(`/${SUCCESS}`)) {
            basename = basename.substr(0, basename.lastIndexOf(`/${SUCCESS}`));
        } else if (basename.endsWith(`/${FAILURE}`)) {
            basename = basename.substr(0, basename.lastIndexOf(`/${FAILURE}`));
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
        return merge({}, state, {
            [this.actionErrorName(
                this.actionBasename(action.type)
            )]: action.payload,
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

    createRequestWatcher(requestActionType, requestWorker) {
        return function* () {
            yield takeEvery(requestActionType, requestWorker);
        };
    }
    createRequestWorker(
        requestWorker,
        successActionCreator,
        failureActionCreator
    ) {
        return function* (action) {
            try {
                const successData = yield call(requestWorker, action);
                yield put(successActionCreator(...Object.values(successData)));
            } catch (e) {
                yield put(failureActionCreator(e));
            }
        };
    }
    createRequestReducer(requestReducer, successReducer, failureReducer) {
        return (state, action) => {
            try {
                const requestedState = requestReducer(state, action);
                return this.successActionReducer(
                    requestedState,
                    action,
                    successReducer
                );
            } catch (e) {
                return this.failureActionReducer(state, action, failureReducer);
            }
        };
    }

    addAsyncAction(
        actionTypeBasename,
        requestWorker,
        requestPrepare,
        successPrepare,
        successReducer,
        failureReducer
    ) {
        // initialize a new action object in _actions
        this._actions[actionTypeBasename] = {};

        // generate actionTypes for the given actionTypeBasename
        const types = this.actionTypes(actionTypeBasename);

        // important to add SUCCESS and FAILURE subactions prior to the REQUEST subaction, as it will refer to them both
        this._actions[actionTypeBasename][SUCCESS] = {
            type: types[SUCCESS],
            actionCreator: createAction(types[SUCCESS], successPrepare),
            reducer: (state, action) => {
                return this.successActionReducer(state, action, successReducer);
            },
        };

        // Note: FAILURE subactions do not had preparers because they simple convey the error thrown to the redux reducer
        this._actions[actionTypeBasename][FAILURE] = {
            type: types[FAILURE],
            actionCreator: createAction(types[FAILURE]),
            reducer: (state, action) =>
                this.failureActionReducer(state, action, failureReducer),
        };

        // add the REQUEST subaction. type and actionCreator first, then worker and watcher
        this._actions[actionTypeBasename][REQUEST] = {
            type: types[REQUEST],
            actionCreator: createAction(types[REQUEST], requestPrepare),
        };
        this._actions[actionTypeBasename][
            REQUEST
        ].worker = this.createRequestWorker(
            requestWorker,
            this._actions[actionTypeBasename][SUCCESS].actionCreator,
            this._actions[actionTypeBasename][FAILURE].actionCreator
        );
        this._actions[actionTypeBasename][
            REQUEST
        ].watcher = this.createRequestWatcher(
            types[REQUEST],
            this._actions[actionTypeBasename][REQUEST].worker
        );
    }

    addAction(
        actionTypeBasename,
        prepare,
        reducer,
        successReducer,
        failureReducer
    ) {
        // initialize the new object in _actions
        this._actions[actionTypeBasename] = {};

        // generate actionTypes for the given actionTypeBasename
        const types = this.actionTypes(actionTypeBasename);

        // add SYNC
        this._actions[actionTypeBasename][SYNC] = {
            type: types[SYNC],
            actionCreator: createAction(types[SYNC], prepare),
            reducer: this.createRequestReducer(
                reducer,
                successReducer,
                failureReducer
            ),
        };
    }
}
