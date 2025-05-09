import { AUTHOR } from '../types/action.types';

// Get all authors
export const getAuthors = (params) => ({
  type: AUTHOR.GET_ALL,
  payload: params
});

export const setAuthors = (authors) => ({
  type: AUTHOR.SET_ALL,
  payload: authors
});

// Get author by ID
export const getAuthorById = (id) => ({
  type: AUTHOR.GET_BY_ID,
  payload: id
});

export const setAuthor = (author) => ({
  type: AUTHOR.SET_ONE,
  payload: author
});

// Create author
export const createAuthor = (data) => ({
  type: AUTHOR.CREATE,
  payload: data
});

export const createAuthorSuccess = (author) => ({
  type: AUTHOR.CREATE_SUCCESS,
  payload: author
});

export const createAuthorFailure = (error) => ({
  type: AUTHOR.CREATE_FAILURE,
  payload: error
});

// Update author
export const updateAuthor = (id, data) => ({
  type: AUTHOR.UPDATE,
  payload: { id, data }
});

export const updateAuthorSuccess = (author) => ({
  type: AUTHOR.UPDATE_SUCCESS,
  payload: author
});

export const updateAuthorFailure = (error) => ({
  type: AUTHOR.UPDATE_FAILURE,
  payload: error
});

// Delete author
export const deleteAuthor = (id) => ({
  type: AUTHOR.DELETE,
  payload: id
});

export const deleteAuthors = (ids) => ({
  type: AUTHOR.DELETE_MANY,
  payload: { ids }
});

export const deleteAuthorSuccess = (ids) => ({
  type: AUTHOR.DELETE_SUCCESS,
  payload: ids
});

export const deleteAuthorFailure = (error) => ({
  type: AUTHOR.DELETE_FAILURE,
  payload: error
});

// Loading state
export const setAuthorLoading = (isLoading) => ({
  type: AUTHOR.SET_LOADING,
  payload: isLoading
});


// Update author status
export const updateAuthorStatus = (id, data) => ({
  type: AUTHOR.UPDATE_STATUS,
  payload: { id, data }
});

export const updateAuthorStatusSuccess = (author) => ({
  type: AUTHOR.UPDATE_STATUS_SUCCESS,
  payload: author
});

export const updateAuthorStatusFailure = (error) => ({
  type: AUTHOR.UPDATE_STATUS_FAILURE,
  payload: error
});
