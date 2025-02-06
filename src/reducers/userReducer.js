import {
  USER_DATA,
  USER_IS_ADMIN,
  USER_IS_AUTHENTICATED,
  USER_IS_USER,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAILURE,
} from "../actions/userActions";

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  isAuthenticated: false,
  isAdmin: false,
  isUser: false,
  registrationSuccess: false,
  userBookings: null,
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
        isAuthenticated: action.payload,
        isAdmin: action.payload.role === "admin",
        isUser: action.payload.role === "user",
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
      //console.log(action.payload);
      return { ...state, isAuthenticated: action.payload };
    case USER_IS_ADMIN:
      return { ...state, isAdmin: action.payload };
    case USER_IS_USER:
      return { ...state, isUser: action.payload };
    case USER_DATA:
      return { ...state, user: action.payload };
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        registrationSuccess: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        registrationSuccess: true,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        registrationSuccess: false,
      };
    case USER_UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.payload,
      };
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_DELETE:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.payload,
      };
    case USER_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };
    case USER_BOOKINGS_SUCCESS:
      return {
        ...state,
        userBookings: action.payload,
      };
    case USER_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userBookings: null,
      };
    default:
      return state;
  }
};

export const initialUserState = initialState;
