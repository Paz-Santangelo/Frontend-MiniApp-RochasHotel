import {
  BOOKING_FAILURE,
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  CLEAR_BOOKING_STATE,
  BOOKING_DELETE,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAILURE,
  ALL_BOOKINGS,
  ALL_BOOKINGS_SUCCESS,
  ALL_BOOKINGS_FAILURE,
  FETCH_BOOKING_CONFIRMATION,
  FETCH_BOOKING_CONFIRMATION_SUCCESS,
  FETCH_BOOKING_CONFIRMATION_FAILURE,
} from "../actions/bookingActions";

export const initialBookingState = {
  loading: false,
  success: false,
  error: null,
  bookingDetails: null,
  successMessage: null,
  allBookings: [],
  bookingByConfirmation: null,
};

export const bookingReducer = (state = initialBookingState, action) => {
  switch (action.type) {
    case BOOKING_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bookingDetails: action.payload,
      };
    case BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_BOOKING_STATE:
      return { ...initialBookingState };
    case BOOKING_DELETE:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: action.payload,
      };
    case BOOKING_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ALL_BOOKINGS:
      return {
        ...state,
        loading: true,
        error: null,
        allBookings: [],
      };
    case ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allBookings: action.payload,
      };
    case ALL_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        allBookings: [],
      };
    case FETCH_BOOKING_CONFIRMATION:
      return {
        ...state,
        loading: true,
        error: null,
        bookingByConfirmation: null,
      };
    case FETCH_BOOKING_CONFIRMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        bookingByConfirmation: action.payload,
      };
    case FETCH_BOOKING_CONFIRMATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        bookingByConfirmation: null,
      };
    default:
      return state;
  }
};
