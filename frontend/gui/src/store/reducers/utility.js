import { createAction } from "@reduxjs/toolkit";
import { updateObjectProperties } from "../../utility";
import { omit } from "lodash";

export const addSliceReducersForAction = (
    sliceReducersObject,
    name,
    requestReducer,
    successReducer,
    failureReducer,
    requestPrepare,
    successPrepare,
    failurePrepare
) => {
    if (requestReducer) {
        sliceReducersObject[`${name}_REQUEST`] = requestPrepare
            ? { reducer: requestReducer, prepare: requestPrepare }
            : requestReducer;
    }

    if (successReducer) {
        sliceReducersObject[`${name}_SUCCESS`] = successPrepare
            ? { reducer: successReducer, prepare: successPrepare }
            : successReducer;
    }

    if (failureReducer) {
        sliceReducersObject[`${name}_FAILURE`] = failurePrepare
            ? { reducer: failureReducer, prepare: failurePrepare }
            : failureReducer;
    }
};
export const addReduxSagaAction = (
    reduxSagaActionsObject,
    sliceReducersObject,
    sliceName,
    actionName,
    successReducer,
    failureReducer,
    requestPrepare,
    successPrepare,
    failurePrepare
) => {
    reduxSagaActionsObject[`${actionName}_REQUEST`] = createAction(
        `${sliceName}/${actionName}_REQUEST`,
        requestPrepare ? requestPrepare : undefined
    );
    addSliceReducersForAction(
        sliceReducersObject,
        actionName,
        undefined,
        successReducer,
        failureReducer,
        undefined,
        successPrepare,
        failurePrepare
    );
};

const getErrorName = (actionType) => {
    let trimmed = actionType;
    if (actionType.endsWith("_REQUEST")) {
        trimmed = actionType.substr(0, actionType.lastIndexOf("_REQUEST"));
    } else if (actionType.endsWith("_SUCCESS")) {
        trimmed = actionType.substr(0, actionType.lastIndexOf("_SUCCESS"));
    } else if (actionType.endsWith("_FAILURE")) {
        trimmed = actionType.substr(0, actionType.lastIndexOf("_FAILURE"));
    }
    return `${trimmed}_ERROR`;
};

export const clearActionError = (state, action) =>
    updateObjectProperties(state, { [`${getErrorName(action.type)}`]: null });
export const deleteActionError = (state, action) =>
    omit(state, getErrorName(action.type));
export const updateActionError = (state, action) => {
    return updateObjectProperties(state, {
        [`${getErrorName(action.type)}`]: action.payload.error,
    });
};
export const failureActionReducer = (state, action) =>
    updateActionError(state, action);

export const failureActionPrepare = (error) => ({ payload: { error } });

export const successActionReducer = (state, action, reducer) => {
    const deletedActionError = deleteActionError(state, action);
    return reducer ? reducer(deletedActionError, action) : deletedActionError;
};
