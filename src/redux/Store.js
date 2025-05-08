import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { thunk } from 'redux-thunk';
import rootSaga from './sagas/root.saga';

import authReducer from './reducers/auth.reducer';
import dashboardReducer from './reducers/dashboard.reducer';
import categoryReducer from './reducers/category.reducer';
import userReducer from './reducers/user.reducer';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  category: categoryReducer,
  user: userReducer,
});

// Enable Redux DevTools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store with middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
);

// Run root saga
sagaMiddleware.run(rootSaga);

export default store;
