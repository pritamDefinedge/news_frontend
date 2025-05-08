import { call, put, takeLatest } from 'redux-saga/effects';
import { USER } from '../types/action.types';
import { ApiRequest } from '../../utils/apiRequest';
import { api_url, users } from '../../utils/Constants';
import {
  setUsers,
  setUser,
  createUserSuccess,
  createUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure
} from '../actions/user.actions';
import Swal from 'sweetalert2';

// Get all users
function* getUsersSaga(action) {
  try {
    const { payload } = action;
    const queryString = new URLSearchParams(payload).toString();

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${users}?${queryString}`
    });

    if (response?.success) {
      yield put(setUsers(response.data));
    } else {
      throw new Error(response.message || 'Failed to fetch users');
    }
  } catch (error) {
    console.error('Get users error:', error);
    yield put(createUserFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Get user by ID
function* getUserByIdSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${users}/${payload}`
    });

    if (response?.success) {
      yield put(setUser(response.data));
    } else {
      throw new Error(response.message || 'Failed to fetch user');
    }
  } catch (error) {
    console.error('Get user error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Create user
function* createUserSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${users}`,
      data: payload
    });

    if (response?.success) {
      yield put(createUserSuccess(response.data));
      Swal.fire({
        icon: 'success',
        title: 'User Created',
        text: 'The user has been successfully created.'
      });
    } else {
      throw new Error(response.message || 'Failed to create user');
    }
  } catch (error) {
    console.error('Create user error:', error);
    yield put(createUserFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Update user
function* updateUserSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${users}/${id}`,
      data: data
    });

    if (response?.success) {
      yield put(updateUserSuccess(response.data));
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        text: 'The user has been successfully updated.'
      });
    } else {
      throw new Error(response.message || 'Failed to update user');
    }
  } catch (error) {
    console.error('Update user error:', error);
    yield put(updateUserFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Delete user
function* deleteUserSaga(action) {
  try {
    const { payload } = action;
    const result = yield Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${users}/${payload}`
      });

      if (response?.success) {
        yield put(deleteUserSuccess(payload));
        Swal.fire({
          title: 'Deleted!',
          text: 'The user has been deleted successfully.',
          icon: 'success'
        });
      } else {
        throw new Error(response.message || 'Failed to delete user');
      }
    }
  } catch (error) {
    console.error('Delete user error:', error);
    yield put(deleteUserFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Delete multiple users
function* deleteUsersSaga(action) {
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
        url: `${api_url}${users}`,
        data: payload,
        header: 'json'
      });

      if (response?.success) {
        yield put(deleteUserSuccess(payload.ids));
        Swal.fire({
          title: 'Deleted!',
          text: 'The users have been deleted successfully.',
          icon: 'success'
        });
      } else {
        throw new Error(response.message || 'Failed to delete users');
      }
    }
  } catch (error) {
    console.error('Delete users error:', error);
    yield put(deleteUserFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
}

// Root saga
export default function* userSaga() {
  yield takeLatest(USER.GET_ALL, getUsersSaga);
  yield takeLatest(USER.GET_BY_ID, getUserByIdSaga);
  yield takeLatest(USER.CREATE, createUserSaga);
  yield takeLatest(USER.UPDATE, updateUserSaga);
  yield takeLatest(USER.DELETE, deleteUserSaga);
  yield takeLatest(USER.DELETE_MANY, deleteUsersSaga);
} 