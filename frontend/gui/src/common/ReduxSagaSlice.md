This class maintains actions creators, sagas, and reducers
There can be:

1. Synchronous Actions, created using `addAction()`
2. Asynchronous Actions, added using `addAsyncAction()`

## actions()

## reducer()

## saga()

## addAction()

```js
// --------
// Example of creating a synchronous action:
// --------

// create ReduxSagaSlice
const reduxSagaSlice = new ReduxSagaSlice("MY_APP", "MY_FEATURE");

// Internally, `prepare` is passed to redux-toolkit's `createAction()`.
// ReduxSagaSlice takes care of action naming and preparing the 
// action `type` field for actions.
const prepare = (newValue1, newValue2) => ({
    payload: { newValue1, newValue2 },
});

// `reducer` reduces the action prepared by `prepare`.
const reducer = (state, action) => {
    const { newValue1, newValue2 } = action.payload;
    return {
        ...state,
        newValue1,
        newValue2,
    };
};
// (Optionally) specify a reducer to be called upon the successful completion of `reducer`
const successReducer = (state, action) => {
    return {
        ...state,
        mySuccessFlag: true,
        myFailureFlag: false,
    };
};
// (Optionally) specify a reducer to be called upon the failure of `reducer`
const failureReducer = (state, action) => {
    return {
        ...state,
        mySuccessFlag: false,
        myFailureFlag: true,
    };
};

// Add the synchronous action
reduxSagaSlice.addAction(
    "MY_ACTION",
    prepare,
    reducer,
    successReducer,
    failureReducer
);

console.log("actionTypes:", ReduxSagaSlice.actionTypes(ReduxSagaSlice));
```

```
actionTypes: {
  MY_ACTION: {
    SYNC: <myActionCreatorFunction>
  }
}
```

## addAsyncAction()

## Action Naming Convention

## Error Handling

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

Types of actions:

1. Redux Action - REQUEST is reduced in a redux reducer

2. Saga Action

Example:
