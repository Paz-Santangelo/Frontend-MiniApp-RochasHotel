import {
  USER_DATA,
  USER_IS_ADMIN,
  USER_IS_AUTHENTICATED,
  USER_IS_USER,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../actions/userActions";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false,
  isUser: false,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        isAuthenticated: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case USER_LOGOUT:
      return { ...initialState };
    case USER_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case USER_IS_ADMIN:
      return { ...state, isAdmin: action.payload };
    case USER_IS_USER:
      return { ...state, isUser: action.payload };
    case USER_DATA:
      return { ...state, user: action.payload };
      default:
      return state;
  }
};

export const initialUserState = initialState;
