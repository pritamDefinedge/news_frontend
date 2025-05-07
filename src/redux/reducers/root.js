import { combineReducers } from "redux";
import dashboard from "./dashboard";

import authReducer from "./auth";
import category from "./category";

import user from "./users";

const rootReducer = combineReducers({
  dashboard,

  category,
  user,
  auth: authReducer,
});

export default rootReducer;
