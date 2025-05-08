import { takeLatest, put, call } from "redux-saga/effects";
import { DASHBOARD } from "../types/action.types";
import { setDashboardData, setLoading, setError } from "../actions/dashboard.actions";
import { getDashboard } from "../../services/dashboard.service";

// Get dashboard data
function* getDashboardSaga() {
  try {
    yield put(setLoading(true));
    const response = yield call(getDashboard);
    if (response.success) {
      yield put(setDashboardData(response.data));
    } else {
      yield put(setError(response.message || "Failed to fetch dashboard data"));
      yield put(setDashboardData({}));
    }
  } catch (error) {
    console.error("Dashboard Saga Error:", error);
    yield put(setError(error.message || "An error occurred"));
    yield put(setDashboardData({}));
  } finally {
    yield put(setLoading(false));
  }
}

// Root saga
export default function* dashboardSaga() {
  yield takeLatest(DASHBOARD.GET, getDashboardSaga);
} 