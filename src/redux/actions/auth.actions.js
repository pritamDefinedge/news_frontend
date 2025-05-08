import { AUTH } from "../types/action.types";

// Pure actions — NO API call here
export const login = (credentials) => ({
  type: AUTH.LOGIN, // This will be intercepted by middleware (e.g., thunk or saga)
  payload: credentials,
});

export const loginSuccess = (user) => ({
  type: AUTH.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: AUTH.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH.LOGOUT, // Also intercepted
});

export const logoutSuccess = () => ({
  type: AUTH.LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: AUTH.LOGOUT_FAILURE,
  payload: error,
});

export const setLoading = (isLoading) => ({
  type: AUTH.SET_LOADING,
  payload: isLoading,
});
