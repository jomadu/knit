import { all } from "redux-saga/effects";
import {saga as authSaga} from '../features/auth/authSlice';

export default function* rootSaga() {
    yield all([authSaga()]);
}
