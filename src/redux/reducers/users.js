import * as actionTypes from "../actionTypes";
import _ from "lodash";

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  success: false,
};

const userReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: _.cloneDeep(payload),
        loading: false,
        error: null,
        success: false,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        selectedUser: _.cloneDeep(payload),
        loading: false,
        error: null,
        success: false,
      };
    case actionTypes.CREATE_USER:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, _.cloneDeep(payload)],
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload._id ? _.cloneDeep(payload) : user
        ),
        selectedUser: _.cloneDeep(payload),
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
};

export default userReducer;
