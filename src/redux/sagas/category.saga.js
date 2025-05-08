import { call, put, takeLatest } from 'redux-saga/effects';
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
import Swal from 'sweetalert2';

// Get all categories
function* getCategoriesSaga(action) {
  try {
    const { payload } = action;
    const queryString = new URLSearchParams(payload).toString();

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${category}?${queryString}`
    });

    if (response?.success) {
      yield put(setCategories(response.data));
    } else {
      throw new Error(response.message || 'Failed to fetch categories');
    }
  } catch (error) {
    console.error('Get categories error:', error);
    yield put(createCategoryFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Get category by ID
function* getCategoryByIdSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${category}/${payload}`
    });

    if (response?.success) {
      yield put(setCategory(response.data));
    } else {
      throw new Error(response.message || 'Failed to fetch category');
    }
  } catch (error) {
    console.error('Get category error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Create category
function* createCategorySaga(action) {
  try {
    const { payload } = action;
    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${category}`,
      data: payload
    });

    if (response?.success) {
      yield put(createCategorySuccess(response.data));
      Swal.fire({
        icon: 'success',
        title: 'Category Created',
        text: 'The category has been successfully created.'
      });
    } else {
      throw new Error(response.message || 'Failed to create category');
    }
  } catch (error) {
    console.error('Create category error:', error);
    yield put(createCategoryFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Update category
function* updateCategorySaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${category}/${id}`,
      data: data
    });

    if (response?.success) {
      yield put(updateCategorySuccess(response.data));
      Swal.fire({
        icon: 'success',
        title: 'Category Updated',
        text: 'The category has been successfully updated.'
      });
    } else {
      throw new Error(response.message || 'Failed to update category');
    }
  } catch (error) {
    console.error('Update category error:', error);
    yield put(updateCategoryFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Delete category
function* deleteCategorySaga(action) {
  try {
    const { payload } = action;
    const result = yield Swal.fire({
      title: 'Are you sure you want to delete this category?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${category}/${payload}`
      });

      if (response?.success) {
        yield put(deleteCategorySuccess(payload));
        Swal.fire({
          title: 'Deleted!',
          text: 'The category has been deleted successfully.',
          icon: 'success'
        });
      } else {
        throw new Error(response.message || 'Failed to delete category');
      }
    }
  } catch (error) {
    console.error('Delete category error:', error);
    yield put(deleteCategoryFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Delete multiple categories
function* deleteCategoriesSaga(action) {
  try {
    const { payload } = action;
    const result = yield Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed && Array.isArray(payload.ids)) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${category}`,
        data: payload,
        header: 'json'
      });

      if (response?.success) {
        yield put(deleteCategorySuccess(payload.ids));
        Swal.fire({
          title: 'Deleted!',
          text: 'The categories have been deleted successfully.',
          icon: 'success'
        });
      } else {
        throw new Error(response.message || 'Failed to delete categories');
      }
    }
  } catch (error) {
    console.error('Delete categories error:', error);
    yield put(deleteCategoryFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Root saga
export default function* categorySaga() {
  yield takeLatest(CATEGORY.GET_ALL, getCategoriesSaga);
  yield takeLatest(CATEGORY.GET_BY_ID, getCategoryByIdSaga);
  yield takeLatest(CATEGORY.CREATE, createCategorySaga);
  yield takeLatest(CATEGORY.UPDATE, updateCategorySaga);
  yield takeLatest(CATEGORY.DELETE, deleteCategorySaga);
  yield takeLatest(CATEGORY.DELETE_MANY, deleteCategoriesSaga);
} 