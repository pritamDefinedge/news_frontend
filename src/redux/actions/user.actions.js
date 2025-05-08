import { USER } from '../types/action.types';

// Get all users
export const getUsers = (params) => ({
  type: USER.GET_ALL,
  payload: params
});

export const setUsers = (users) => ({
  type: USER.SET_ALL,
  payload: users
});

// Get user by ID
export const getUserById = (id) => ({
  type: USER.GET_BY_ID,
  payload: id
});

export const setUser = (user) => ({
  type: USER.SET_ONE,
  payload: user
});

// Create user
export const createUser = (data) => ({
  type: USER.CREATE,
  payload: data
});

export const createUserSuccess = (user) => ({
  type: USER.CREATE_SUCCESS,
  payload: user
});

export const createUserFailure = (error) => ({
  type: USER.CREATE_FAILURE,
  payload: error
});

// Update user
export const updateUser = (id, data) => ({
  type: USER.UPDATE,
  payload: { id, data }
});

export const updateUserSuccess = (user) => ({
  type: USER.UPDATE_SUCCESS,
  payload: user
});

export const updateUserFailure = (error) => ({
  type: USER.UPDATE_FAILURE,
  payload: error
});

// Delete user
export const deleteUser = (id) => ({
  type: USER.DELETE,
  payload: id
});

export const deleteUsers = (ids) => ({
  type: USER.DELETE_MANY,
  payload: { ids }
});

export const deleteUserSuccess = (ids) => ({
  type: USER.DELETE_SUCCESS,
  payload: ids
});

export const deleteUserFailure = (error) => ({
  type: USER.DELETE_FAILURE,
  payload: error
});

// Loading state
export const setLoading = (isLoading) => ({
  type: USER.SET_LOADING,
  payload: isLoading
}); 