import { call, put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import { CATEGORY } from '../types/action.types';
import { ApiRequest } from '../../utils/apiRequest';
import { api_url, category } from '../../utils/Constants';
import { Colors } from '../../assets/styles';
import {
  setCategories,
  setCategory,
  createCategorySuccess,
  createCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure
} from '../actions/category.actions';

// ====== Helpers ======

function showErrorAlert(message = 'An error occurred') {
  Swal.fire({ icon: 'error', title: 'Error', text: message });
}

function showSuccessAlert(title, text) {
  Swal.fire({ icon: 'success', title, text });
}

function* handleApiError(actionFailure, error, fallbackMessage) {
  const message = error?.message || fallbackMessage;
  console.error(fallbackMessage, error);
  yield put(actionFailure(message));
  showErrorAlert(message);
}

// ====== Sagas ======

// GET all categories
function* getCategoriesSaga({ payload }) {
  try {
    // Remove empty search parameter
    const queryParams = { ...payload };
    
    // Handle search parameter
    if (!queryParams.search) {
      delete queryParams.search;
    }

    // Handle isActive parameter
    if (queryParams.isActive !== undefined) {
      queryParams.isActive = queryParams.isActive === true || queryParams.isActive === "true";
    }
    
    const queryString = new URLSearchParams(queryParams).toString();
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${category}?${queryString}`
    });

    if (response?.success) {
      yield put(setCategories({
        categories: response.data.categories,
        totalCount: response.data.pagination.total,
        currentPage: response.data.pagination.page,
        totalPages: response.data.pagination.pages
      }));
    } else {
      throw new Error(response.message || 'Failed to fetch categories');
    }
  } catch (error) {
    yield* handleApiError(createCategoryFailure, error, 'Get categories error');
  }
}

// GET category by ID
function* getCategoryByIdSaga({ payload }) {
  try {
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${category}/${payload}`
    });

    if (response?.success) {
      yield put(setCategory(response.data));
    } else {
      throw new Error(response.message || 'Failed to fetch category');
    }
  } catch (error) {
    yield* handleApiError(() => {}, error, 'Get category error');
  }
}

// CREATE category
function* createCategorySaga({ payload }) {
  try {
    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${category}`,
      data: payload
    });

    if (response?.success) {
      yield put(createCategorySuccess(response.data));
      showSuccessAlert('Category Created', 'The category has been successfully created.');
    } else {
      throw new Error(response.message || 'Failed to create category');
    }
  } catch (error) {
    yield* handleApiError(createCategoryFailure, error, 'Create category error');
  }
}

// UPDATE category
function* updateCategorySaga({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${category}/${id}`,
      data
    });

    if (response?.success) {
      yield put(updateCategorySuccess(response.data));
      showSuccessAlert('Category Updated', 'The category has been successfully updated.');
    } else {
      throw new Error(response.message || 'Failed to update category');
    }
  } catch (error) {
    yield* handleApiError(updateCategoryFailure, error, 'Update category error');
  }
}

// DELETE single category
function* deleteCategorySaga({ payload }) {
  try {
    const result = yield Swal.fire({
      title: 'Are you sure you want to delete this category?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: 'Delete'
    });

    if (!result.isConfirmed) return;

    const response = yield call(ApiRequest.deleteRequest, {
      url: `${api_url}${category}/${payload}`
    });

    if (response?.success) {
      yield put(deleteCategorySuccess(payload));
      showSuccessAlert('Deleted!', 'The category has been deleted successfully.');
    } else {
      throw new Error(response.message || 'Failed to delete category');
    }
  } catch (error) {
    yield* handleApiError(deleteCategoryFailure, error, 'Delete category error');
  }
}

// DELETE multiple categories
function* deleteCategoriesSaga({ payload }) {
  try {
    const result = yield Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    });

    if (!result.isConfirmed || !Array.isArray(payload.ids)) return;

    const response = yield call(ApiRequest.deleteRequest, {
      url: `${api_url}${category}`,
      data: payload,
      header: 'json'
    });

    if (response?.success) {
      yield put(deleteCategorySuccess(payload.ids));
      showSuccessAlert('Deleted!', 'The categories have been deleted successfully.');
    } else {
      throw new Error(response.message || 'Failed to delete categories');
    }
  } catch (error) {
    yield* handleApiError(deleteCategoryFailure, error, 'Delete categories error');
  }
}

// ====== Root Saga ======
export default function* categorySaga() {
  yield takeLatest(CATEGORY.GET_ALL, getCategoriesSaga);
  yield takeLatest(CATEGORY.GET_BY_ID, getCategoryByIdSaga);
  yield takeLatest(CATEGORY.CREATE, createCategorySaga);
  yield takeLatest(CATEGORY.UPDATE, updateCategorySaga);
  yield takeLatest(CATEGORY.DELETE, deleteCategorySaga);
  yield takeLatest(CATEGORY.DELETE_MANY, deleteCategoriesSaga);
}
