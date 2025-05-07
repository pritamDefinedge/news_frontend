import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, users } from "../../utils/Constants";
import { Colors } from "../../assets/styles";
import {
  getUsers,
  setUsers,
  getUserById,
  setUser,
  createUser,
  createUserSuccess,
  createUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
} from "../Actions/usersActions.js";

function* getUsersSaga(action) {
  try {
    const { payload } = action;

    const queryString = new URLSearchParams(payload).toString();

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${users}?${queryString}`,
    });

    if (response?.success) {
      yield put(setUsers(response.data));
    } else {
      yield put(createUserFailure(response.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch Users",
      });
    }
  } catch (error) {
    yield put(createUserFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

function* getUserByIdSaga(action) {
  try {
    const { payload } = action; // Assuming the action contains the user ID

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${users}/${payload}`,
    });

    if (response?.success) {
      yield put(setUser(response.data)); // Dispatch the setUser action
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch the User",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

function* createUserSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const { payload } = action;

    // Ensure api_url and Users are defined correctly
    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${users}`, // Adjusted the API endpoint for Users
      data: payload,
      header: "json", // Include the new User data
    });
    console.log("response", response);
    // Check for response success
    if (response?.success) {
      yield put(createUserSuccess(response.data)); // Dispatch success action

      // Show success notification
      Swal.fire({
        icon: "success",
        title: "User Created",
        text: "The User has been successfully created.",
      });
    } else {
      yield put(createUserFailure(response.message || "Failed to create User")); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to create User",
      });
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(
      createUserFailure(error.message || "An unexpected error occurred")
    ); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "An unexpected error occurred",
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

function* updateUserSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state

    const { id, data } = action.payload; // Destructure id and data from action payload

    // Make the API request to update the User
    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${users}/${id}`, // Correctly access id from action.payload
      data: data,
      header: "json", // Include the updated User data
    });

    if (response?.success) {
      yield put(updateUserSuccess(response.data)); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "User Updated",
        text: "The User has been successfully updated.",
      });
    } else {
      yield put(updateUserFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to update User",
      });
    }
  } catch (error) {
    yield put(updateUserFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteUserSaga(action) {
  try {
    const { payload } = action;

    // Display the confirmation alert
    const result = yield Swal.fire({
      title: `Are you sure you want to delete this User?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    // If user confirmed the deletion
    if (result.isConfirmed) {
      // Call API to delete the User by ID
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${users}/${payload}`, // Ensure correct API URL with User ID
      });

      // If API deletion is successful
      if (response?.success) {
        // Dispatch the success action to remove the User from the store
        yield put(deleteUserSuccess(payload));

        // Fetch the latest Users after deletion
        yield put(getUsers());

        // Display success alert
        yield Swal.fire({
          title: "Deleted!",
          text: "The User has been deleted successfully.",
          icon: "success",
        });
      } else {
        // If the response failed, dispatch failure action and show error alert
        yield put(deleteUserFailure(response.message));

        yield Swal.fire({
          title: "Deletion Failed",
          text: "Failed to delete the User. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(deleteUserFailure(error.message));

    // Show an error alert
    yield Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}


function* deleteUsersSaga(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure you want to delete?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      if (
        typeof payload === "object" &&
        payload !== null &&
        Array.isArray(payload.ids)
      ) {
        const response = yield call(ApiRequest.deleteRequest, {
          url: `${api_url}${users}`,
          data: payload,
          header: "json",
        });

        if (response?.success) {
          yield put(getUsers());
          yield put(deleteUserSuccess(response.message));
        } else {
          yield put(deleteUserFailure(response.message));
          Swal.fire(
            "Deletion Failed",
            "Failed to delete the User. Please try again.",
            "error"
          );
        }
      }
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(deleteUserFailure(error.message));

    // Show an error alert
    Swal.fire("Error", error.message, "error");
  }
}


export default function* UsersSaga() {
  yield takeLeading(actionTypes.GET_USERS, getUsersSaga);
  yield takeLeading(actionTypes.GET_USER_BY_ID, getUserByIdSaga);
  yield takeLeading(actionTypes.DELETE_USER, deleteUserSaga);
  yield takeLeading(actionTypes.DELETE_USERS, deleteUsersSaga);
  yield takeLeading(actionTypes.CREATE_USER, createUserSaga);
  yield takeLeading(actionTypes.UPDATE_USER, updateUserSaga);
}
