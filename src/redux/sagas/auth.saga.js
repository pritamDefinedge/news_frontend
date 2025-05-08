import { call, put, takeLatest } from 'redux-saga/effects';
import { AUTH } from '../types/action.types';
import { ApiRequest } from '../../utils/apiRequest';
import { api_url, login_endpoint } from '../../utils/Constants';
import { isTokenExpired } from '../../utils/jwtUtils';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  setLoading
} from '../actions/auth.actions';
import Swal from 'sweetalert2';

// 🔐 Worker Saga: Login
function* handleLogin(action) {
  try {
    yield put(setLoading(true));

    const { email, password } = action.payload;

    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${login_endpoint}`,
      header: 'json',
      data: { email, password }
    });

    if (response?.success) {
      const { accessToken, refreshToken, author } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      yield put(loginSuccess(author)); // reducer uses author.email
      yield call([Swal, 'fire'], {
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      console.error('Login error:', response.message);
      throw new Error(response.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login :', error);

    yield put(loginFailure(error.message));
    yield call([Swal, 'fire'], {
      icon: 'error',
      title: 'Login Failed',
      text: error.message || 'An error occurred. Please try again.'
    });
  } finally {
    yield put(setLoading(false));
  }
}

// 🔐 Worker Saga: Logout
function* handleLogout() {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    yield put(logoutSuccess());

    yield call([Swal, 'fire'], {
      icon: 'success',
      title: 'Logout Successful',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    yield put(logoutFailure(error.message));
    yield call([Swal, 'fire'], {
      icon: 'error',
      title: 'Logout Failed',
      text: 'An error occurred during logout.'
    });
  }
}

// 🕒 Token Expiry Checker (on app start)
function* checkTokenExpiration() {
  const token = localStorage.getItem('accessToken');
  if (token && isTokenExpired(token)) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    yield put(logoutSuccess());
  }
}

// 🚀 Root Saga
export default function* authSaga() {
  yield takeLatest(AUTH.LOGIN_REQUEST, handleLogin);
  yield takeLatest(AUTH.LOGOUT, handleLogout);
  yield call(checkTokenExpiration);
}
