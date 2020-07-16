import { all } from "redux-saga/effects";
import {saga as authSaga} from '../features/auth/slice';
import {saga as reportSaga} from '../features/report/slice';

export default function* rootSaga() {
    yield all([authSaga(), reportSaga()]);
}
