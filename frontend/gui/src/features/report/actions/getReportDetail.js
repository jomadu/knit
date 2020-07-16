import { call } from "redux-saga/effects";
import { merge } from "lodash";

import { getFromReportDetail } from "./apiCalls";

export const GET_REPORT_DETAIL = "GET_REPORT_DETAIL";

export function* getReportDetailRequestWorker(action) {
    const data = yield call(getFromReportDetail, action.payload.pk);
    return { data };
}

export const getReportDetailRequestPrepare = (id) => ({
    payload: {
        id,
    },
});

export const getReportDetailSuccessPrepare = (data) => ({
    payload: {
        ...data,
    },
});

export const getReportDetailSuccessReducer = (state, action) => {
    const { id, title, description } = action.payload;
    return merge({}, state, {
        [id]: {
            title,
            description
        },
        ids: [id],
    });
};
