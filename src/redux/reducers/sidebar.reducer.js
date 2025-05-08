import { SIDEBAR } from '../types/sidebar.types';

const initialState = {
  isSidebarOpen: true, 
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR.TOGGLE:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
