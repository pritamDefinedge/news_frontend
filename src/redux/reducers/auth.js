import * as actionTypes from "../actionTypes";

const initialState = {
  userEmail: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        userEmail: payload,
        isAuthenticated: true,
        error: null,
      };
    }

    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        error: payload,
      };
    }

    case actionTypes.LOGOUT: {
      return {
        ...initialState,
        isAuthenticated: false,
      };
    }

    case actionTypes.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
        isAuthenticated: false, 
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
