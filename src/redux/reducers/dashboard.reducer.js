import { DASHBOARD } from '../types/action.types';

const initialState = {
  isSidebarOpen: true,
  dashboardData: null,
  loading: false,
  error: null
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD.SET_DATA:
      return {
        ...state,
        dashboardData: action.payload,
        loading: false,
        error: null
      };

    case DASHBOARD.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      };

    case DASHBOARD.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default dashboardReducer; 