import { call, put, takeLatest } from 'redux-saga/effects';
import { AUTHOR } from '../types/action.types';
import { ApiRequest } from '../../utils/apiRequest';
import { api_url, authors } from '../../utils/Constants';
import {
  setAuthors,
  setAuthor,
  createAuthorSuccess,
  createAuthorFailure,
  updateAuthorSuccess,
  updateAuthorFailure,
  deleteAuthorSuccess,
  deleteAuthorFailure,
  setAuthorLoading
} from '../actions/author.actions';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// Get all authors
function* getAuthorsSaga(action) {
  try {
    yield put(setAuthorLoading(true));
    const { payload } = action;
    
    // Build query params object with all possible filters
    const queryParams = {
      page: payload?.page || 1,
      limit: payload?.limit || 10,
      sortBy: payload?.sortBy || 'createdAt',
      sortOrder: payload?.sortOrder || 'desc'
    };

    // Only add optional filters if they have values
    if (payload?.search?.trim()) {
      queryParams.search = payload.search.trim();
    }
    if (payload?.role) {
      queryParams.role = payload.role;
    }
    // Convert string values to boolean for isActive and isVerified
    if (payload?.isActive !== undefined && payload?.isActive !== '') {
      queryParams.isActive = payload.isActive === 'true';
    }
    if (payload?.isVerified !== undefined && payload?.isVerified !== '') {
      queryParams.isVerified = payload.isVerified === 'true';
    }
    
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${api_url}${authors}?${queryString}`;

    const response = yield call(ApiRequest.getRequest, {
      url: url
    });

    if (response?.success) {
      // Ensure we're passing an array to the reducer
      const authorsData = Array.isArray(response.data) ? response.data : 
                         response.data?.authors || response.data?.data || [];
      yield put(setAuthors(authorsData));
    } else {
      throw new Error(response.message || 'Failed to fetch authors');
    }
  } catch (error) {
    console.error('Get authors error:', error);
    yield put(createAuthorFailure(error.message));
    toast.error(error.message || 'Failed to fetch authors');
  } finally {
    yield put(setAuthorLoading(false));
  }
}

// Get author by ID
function* getAuthorByIdSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${authors}/${payload}`
    });

    if (response?.success) {
      yield put(setAuthor(response.data));
    } else {
      throw new Error(response.message || 'Failed to fetch author');
    }
  } catch (error) {
    console.error('Get author error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Create author
function* createAuthorSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${authors}`,
      data: payload
    });

    if (response?.success) {
      yield put(createAuthorSuccess(response.data));
      Swal.fire({
        icon: 'success',
        title: 'Author Created',
        text: 'The author has been successfully created.'
      });
    } else {
      throw new Error(response.message || 'Failed to create author');
    }
  } catch (error) {
    console.error('Create author error:', error);
    yield put(createAuthorFailure(error.message));
   
  }
}

// Update author
function* updateAuthorSaga(action) {
  try {
    const { id, data } = action.payload;
    console.log('Updating author with ID:', id);
    console.log('Update data:', data);

    // Ensure data is FormData
    if (!(data instanceof FormData)) {
      throw new Error('Data must be FormData for author update');
    }

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${authors}/${id}`,
      data: data
    });

    console.log("Update response:", response);
    
    if (response?.success) {
      yield put(updateAuthorSuccess(response.data));
      Swal.fire({
        icon: 'success',
        title: 'Author Updated',
        text: 'The author has been successfully updated.'
      });
    } else {
      throw new Error(response.message || 'Failed to update author');
    }
  } catch (error) {
    console.error('Update author error:', error);
    yield put(updateAuthorFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Failed to update author. Please try again.'
    });
  }
}

// Delete author
function* deleteAuthorSaga(action) {
  try {
    const { payload } = action;
    const result = yield Swal.fire({
      title: 'Are you sure you want to delete this author?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${authors}/${payload}`
      });

      if (response?.success) {
        yield put(deleteAuthorSuccess(payload));
        Swal.fire({
          title: 'Deleted!',
          text: 'The author has been deleted successfully.',
          icon: 'success'
        });
      } else {
        throw new Error(response.message || 'Failed to delete author');
      }
    }
  } catch (error) {
    console.error('Delete author error:', error);
    yield put(deleteAuthorFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Delete multiple authors
function* deleteAuthorsSaga(action) {
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
        url: `${api_url}${authors}`,
        data: payload,
        header: 'json'
      });

      if (response?.success) {
        yield put(deleteAuthorSuccess(payload.ids));
        Swal.fire({
          title: 'Deleted!',
          text: 'The authors have been deleted successfully.',
          icon: 'success'
        });
      } else {
        throw new Error(response.message || 'Failed to delete authors');
      }
    }
  } catch (error) {
    console.error('Delete authors error:', error);
    yield put(deleteAuthorFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Update author status
function* updateAuthorStatusSaga(action) {
  try {
    const { id, data } = action.payload;
    console.log('Updating author status with ID:', id);
    console.log('Update status data:', data);
    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${authors}/${id}/status`,
      data: data,
      header:"json"
    });

    if (response?.success) {
      yield put(updateAuthorSuccess(response.data));
      toast.success(`Author has been ${data.isActive ? 'activated' : 'deactivated'} successfully`);
    } else {
      throw new Error(response.message || 'Failed to update author status');
    }
  } catch (error) {
    console.error('Update author status error:', error);
    yield put(updateAuthorFailure(error.message));
    toast.error(error.message || 'Failed to update author status');
  }
}

// Root saga
export default function* authorSaga() {
  yield takeLatest(AUTHOR.GET_ALL, getAuthorsSaga);
  yield takeLatest(AUTHOR.GET_BY_ID, getAuthorByIdSaga);
  yield takeLatest(AUTHOR.CREATE, createAuthorSaga);
  yield takeLatest(AUTHOR.UPDATE, updateAuthorSaga);
  yield takeLatest(AUTHOR.DELETE, deleteAuthorSaga);
  yield takeLatest(AUTHOR.DELETE_MANY, deleteAuthorsSaga);
  yield takeLatest(AUTHOR.UPDATE_STATUS, updateAuthorStatusSaga);
}
