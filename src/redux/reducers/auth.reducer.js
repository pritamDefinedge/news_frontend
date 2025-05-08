import { AUTH } from "../types/action.types";

const initialState = {
  userEmail: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        userEmail: action.payload.email,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH.LOGIN_FAILURE:
      return {
        ...state,
        userEmail: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case AUTH.LOGOUT:
      return {
        ...state,
        loading: true,
      };

    case AUTH.LOGOUT_SUCCESS:
      return {
        ...initialState,
      };

    case AUTH.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AUTH.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
