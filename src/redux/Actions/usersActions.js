import * as actionTypes from "../actionTypes";

// Action to fetch all users
export const getUsers = (payload) => ({
  type: actionTypes.GET_USERS,
  payload
});

// Action to set the list of users in the state
export const setUsers = (payload) => ({
  type: actionTypes.SET_USERS,
  payload,
});

// Action to fetch a user by ID
export const getUserById = (payload) => ({
  type: actionTypes.GET_USER_BY_ID,
  payload, // User ID
});

// Action to set a specific user in the state
export const setUser = (payload) => ({
  type: actionTypes.SET_USER,
  payload,
});

// Action to create a new user
export const createUser = (payload) => ({
  type: actionTypes.CREATE_USER,
  payload,
});

// Action to handle successful user creation
export const createUserSuccess = (payload) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  payload,
});

// Action to handle failed user creation
export const createUserFailure = (error) => ({
  type: actionTypes.CREATE_USER_FAILURE,
  payload: error,
});

// Action to update an existing user
export const updateUser = (id, userData) => ({
  type: actionTypes.UPDATE_USER,
  payload: {
    id, // User ID
    data: userData, // User data to update
  },
});

// Action to handle successful user update
export const updateUserSuccess = (payload) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload,
});

// Action to handle failed user update
export const updateUserFailure = (error) => ({
  type: actionTypes.UPDATE_USER_FAILURE,
  payload: error,
});

// Action to delete a user
export const deleteUser = (id) => ({
  type: actionTypes.DELETE_USER,
  payload: id,
});

export const deleteUsers = (payload) => ({
  type: actionTypes.DELETE_USERS,
  payload,
});

// Action to handle successful user deletion
export const deleteUserSuccess = (payload) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  payload,
});

// Action to handle failed user deletion
export const deleteUserFailure = (error) => ({
  type: actionTypes.DELETE_USER_FAILURE,
  payload: error,
});
