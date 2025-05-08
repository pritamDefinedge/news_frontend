import { USER } from '../types/action.types';

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  success: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.SET_ALL:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
        success: false
      };

    case USER.SET_ONE:
      return {
        ...state,
        selectedUser: action.payload,
        loading: false,
        error: null,
        success: false
      };

    case USER.CREATE:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case USER.CREATE_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
        error: null,
        success: true
      };

    case USER.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    case USER.UPDATE:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case USER.UPDATE_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
        selectedUser: action.payload,
        loading: false,
        error: null,
        success: true
      };

    case USER.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    case USER.DELETE:
    case USER.DELETE_MANY:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case USER.DELETE_SUCCESS:
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [action.payload];
      return {
        ...state,
        users: state.users.filter(user => !idsToDelete.includes(user.id)),
        loading: false,
        error: null,
        success: true
      };

    case USER.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    default:
      return state;
  }
};

export default userReducer; 