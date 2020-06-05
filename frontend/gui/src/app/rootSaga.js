import { all } from "redux-saga/effects";
import {saga as authSaga} from '../features/auth/slice';

export default function* rootSaga() {
    yield all([authSaga()]);
}
