import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import categoryReducer from './category.reducer';
import authorReducer from './author.reducer';
import dashboardReducer from './dashboard.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  author: authorReducer,
  dashboard: dashboardReducer
});

export default rootReducer; 