import { all } from 'redux-saga/effects';
import authSaga from './auth.saga';
import categorySaga from './category.saga';
import authorSaga from './author.saga';
import dashboardSaga from './dashboard.saga';

// Root saga that combines all feature sagas
export default function* rootSaga() {
  yield all([
    authSaga(),
    categorySaga(),
    authorSaga(),
    dashboardSaga()
  ]);
} 