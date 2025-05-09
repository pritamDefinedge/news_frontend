import { AUTHOR } from '../types/action.types';

const initialState = {
  authors: [],
  selectedAuthor: null,
  loading: false,
  error: null,
  success: false
};

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHOR.SET_ALL:
      return {
        ...state,
        authors: action.payload,
        loading: false,
        error: null,
        success: false
      };

    case AUTHOR.SET_ONE:
      return {
        ...state,
        selectedAuthor: action.payload,
        loading: false,
        error: null,
        success: false
      };

    case AUTHOR.CREATE:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case AUTHOR.CREATE_SUCCESS:
      return {
        ...state,
        authors: [...state.authors, action.payload],
        loading: false,
        error: null,
        success: true
      };

    case AUTHOR.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    case AUTHOR.UPDATE:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case AUTHOR.UPDATE_SUCCESS:
      return {
        ...state,
        authors: state.authors.map(author =>
          author._id === action.payload._id ? action.payload : author
        ),
        selectedAuthor: action.payload,
        loading: false,
        error: null,
        success: true
      };

    case AUTHOR.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    case AUTHOR.UPDATE_STATUS:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case AUTHOR.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        authors: state.authors.map(author =>
          author._id === action.payload._id ? action.payload : author
        ),
        selectedAuthor: action.payload,
        loading: false,
        error: null,
        success: true
      };

    case AUTHOR.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    case AUTHOR.DELETE:
    case AUTHOR.DELETE_MANY:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case AUTHOR.DELETE_SUCCESS:
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [action.payload];
      return {
        ...state,
        authors: state.authors.filter(author => !idsToDelete.includes(author._id)),
        loading: false,
        error: null,
        success: true
      };

    case AUTHOR.DELETE_FAILURE:
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

export default authorReducer;
