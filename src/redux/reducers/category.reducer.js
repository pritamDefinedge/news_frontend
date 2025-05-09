import { CATEGORY } from '../types/action.types';

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  success: false,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY.SET_ALL:
      return {
        ...state,
        categories: action.payload.categories || [],
        totalCount: action.payload.totalCount || 0,
        currentPage: action.payload.currentPage || 1,
        totalPages: action.payload.totalPages || 1,
        loading: false,
        error: null,
        success: false
      };

    case CATEGORY.SET_ONE:
      return {
        ...state,
        selectedCategory: action.payload,
        loading: false,
        error: null,
        success: false
      };

    case CATEGORY.CREATE:
    case CATEGORY.UPDATE:
    case CATEGORY.DELETE:
    case CATEGORY.DELETE_MANY:
    case CATEGORY.UPDATE_STATUS:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };

    case CATEGORY.CREATE_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
        error: null,
        success: true
      };

    case CATEGORY.UPDATE_SUCCESS:
    case CATEGORY.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
        selectedCategory: action.payload,
        loading: false,
        error: null,
        success: true
      };

    case CATEGORY.DELETE_SUCCESS:
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [action.payload];
      return {
        ...state,
        categories: state.categories.filter(category => !idsToDelete.includes(category.id)),
        loading: false,
        error: null,
        success: true
      };

    case CATEGORY.CREATE_FAILURE:
    case CATEGORY.UPDATE_FAILURE:
    case CATEGORY.DELETE_FAILURE:
    case CATEGORY.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    case CATEGORY.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default categoryReducer;
