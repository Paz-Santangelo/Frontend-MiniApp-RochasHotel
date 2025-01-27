import {
  BOOKING_FAILURE,
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  CLEAR_BOOKING_STATE,
} from "../actions/bookingActions";

const initialBookingState = {
  loading: false,
  success: false,
  error: null,
  bookingDetails: null,
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
    default:
      return state;
  }
};
