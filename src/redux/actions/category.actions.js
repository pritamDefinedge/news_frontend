import { CATEGORY } from '../types/action.types';

// Get all categories
export const getCategories = (params) => ({
  type: CATEGORY.GET_ALL,
  payload: params
});

export const setCategories = (categories) => ({
  type: CATEGORY.SET_ALL,
  payload: categories
});

// Get category by ID
export const getCategoryById = (id) => ({
  type: CATEGORY.GET_BY_ID,
  payload: id
});

export const setCategory = (category) => ({
  type: CATEGORY.SET_ONE,
  payload: category
});

// Create category
export const createCategory = (data) => ({
  type: CATEGORY.CREATE,
  payload: data
});

export const createCategorySuccess = (category) => ({
  type: CATEGORY.CREATE_SUCCESS,
  payload: category
});

export const createCategoryFailure = (error) => ({
  type: CATEGORY.CREATE_FAILURE,
  payload: error
});

// Update category
export const updateCategory = (id, data) => ({
  type: CATEGORY.UPDATE,
  payload: { id, data }
});

export const updateCategorySuccess = (category) => ({
  type: CATEGORY.UPDATE_SUCCESS,
  payload: category
});

export const updateCategoryFailure = (error) => ({
  type: CATEGORY.UPDATE_FAILURE,
  payload: error
});

// Update category status (Active / Blocked)
export const updateCategoryStatus = (id, status) => ({
  type: CATEGORY.UPDATE_STATUS,
  payload: { id, status }
});

export const updateCategoryStatusSuccess = (updatedCategory) => ({
  type: CATEGORY.UPDATE_STATUS_SUCCESS,
  payload: updatedCategory
});

export const updateCategoryStatusFailure = (error) => ({
  type: CATEGORY.UPDATE_STATUS_FAILURE,
  payload: error
});

// Delete category
export const deleteCategory = (id) => ({
  type: CATEGORY.DELETE,
  payload: id
});

export const deleteCategories = (ids) => ({
  type: CATEGORY.DELETE_MANY,
  payload: { ids }
});

export const deleteCategorySuccess = (ids) => ({
  type: CATEGORY.DELETE_SUCCESS,
  payload: ids
});

export const deleteCategoryFailure = (error) => ({
  type: CATEGORY.DELETE_FAILURE,
  payload: error
});

// Loading state
export const setLoading = (isLoading) => ({
  type: CATEGORY.SET_LOADING,
  payload: isLoading
});
