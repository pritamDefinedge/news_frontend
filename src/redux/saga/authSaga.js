import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, login_endpoint } from "../../utils/Constants";
import { isTokenExpired } from "../../utils/jwtUtils";
import { logout } from "../Actions/authActions.js"; // Update import path to the correct action file

function* loginUser(action) {
  try {
    const { email, password } = action.payload;

    // Show loading state
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && isTokenExpired(accessToken)) {
      throw new Error("Token expired");
    }

    // Make API request to login

    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${login_endpoint}`,
      header: "json",
      data: { email, password }, // Send email and password
    });
    if (response?.success) {
      // If login is successful, store user email in local storage
      // console.log("response",response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Dispatch login success action
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        payload: response.userEmail,
      });

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      // Handle login failure
      yield put({
        type: actionTypes.LOGIN_FAILURE,
        payload: response.error || "Login failed. Please try again.",
      });
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: response.error || "Invalid credentials.",
      });
    }
  } catch (error) {
    console.error("Login error: ", error);
    yield put({ type: actionTypes.LOGIN_FAILURE, payload: "Server Error" });
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "An error occurred. Please try again.",
    });
  } finally {
    // Hide loading state
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* logoutUser() {
  try {
    // Clear user data from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Dispatch logout action
    yield put({ type: actionTypes.LOGOUT });

    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    console.error("Logout error: ", error);
  }
}

function* handleTokenExpiration() {
  const token = localStorage.getItem("accessToken");
  if (token && isTokenExpired(token)) {
    console.log("token", token);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    yield put(logout());

    Swal.fire({
      icon: "error",
      title: "Session Expired",
      text: "Please login again.",
    });
  }
}

export default function* authSaga() {
  yield takeLeading(actionTypes.LOGIN_REQUEST, loginUser);
  yield takeLeading(actionTypes.LOGOUT, logoutUser);
  yield handleTokenExpiration();
}
