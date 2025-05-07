import { all } from "redux-saga/effects";
import dashboardSaga from "./dashboardSaga";
import authSaga from "./authSaga";
import categorySaga from "./categorySaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([dashboardSaga(), authSaga(), categorySaga(), userSaga()]);
}
