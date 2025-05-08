import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import categoryReducer from './category.reducer';
import userReducer from './user.reducer';
import dashboardReducer from './dashboard.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  user: userReducer,
  dashboard: dashboardReducer
});

export default rootReducer; 