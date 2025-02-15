import ApiService from "../services/ApiService";

export const BOOKING_REQUEST = "BOOKING_REQUEST";
export const BOOKING_SUCCESS = "BOOKING_SUCCESS";
export const BOOKING_FAILURE = "BOOKING_FAILURE";
export const CLEAR_BOOKING_STATE = "CLEAR_BOOKING_STATE";
export const BOOKING_DELETE = "BOOKING_DELETE";
export const BOOKING_DELETE_SUCCESS = "BOOKING_DELETE_SUCCESS";
export const BOOKING_DELETE_FAILURE = "BOOKING_DELETE_FAILURE";
export const CLEAR_SUCCESS_MESSAGE = "CLEAR_SUCCESS_MESSAGE";
export const ALL_BOOKINGS = "ALL_BOOKINGS";
export const ALL_BOOKINGS_SUCCESS = "ALL_BOOKINGS_SUCCESS";
export const ALL_BOOKINGS_FAILURE = "ALL_BOOKINGS_FAILURE";
export const FETCH_BOOKING_CONFIRMATION = "FETCH_BOOKING_CONFIRMATION";
export const FETCH_BOOKING_CONFIRMATION_SUCCESS =
  "FETCH_BOOKING_CONFIRMATION_SUCCESS";
export const FETCH_BOOKING_CONFIRMATION_FAILURE =
  "FETCH_BOOKING_CONFIRMATION_FAILURE";

export const bookRoom = (roomId, userId, bookingData) => async (dispatch) => {
  dispatch({ type: BOOKING_REQUEST });

  try {
    const response = await ApiService.bookRoom(roomId, userId, bookingData);
    dispatch({ type: BOOKING_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";
    //console.log(message);

    dispatch({
      type: BOOKING_FAILURE,
      payload: message,
    });
  }
};

export const clearBookingState = () => () => ({
  type: CLEAR_BOOKING_STATE,
});

export const deleteBookingAction = (bookingId) => async (dispatch) => {
  dispatch({ type: BOOKING_DELETE });

  try {
    const response = await ApiService.cancelBooking(bookingId);

    //console.log(response);
    dispatch({ type: BOOKING_DELETE_SUCCESS, payload: response });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

    dispatch({ type: BOOKING_DELETE_FAILURE, payload: message });
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: ALL_BOOKINGS });

  try {
    const response = await ApiService.getAllBookings();

    dispatch({ type: ALL_BOOKINGS_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

    dispatch({ type: ALL_BOOKINGS_FAILURE, payload: message });
  }
};

export const fetchBookingByConfirmationCode =
  (confirmationCode) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKING_CONFIRMATION });

    try {
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );

      dispatch({
        type: FETCH_BOOKING_CONFIRMATION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data ||
        "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

      dispatch({ type: FETCH_BOOKING_CONFIRMATION_FAILURE, payload: message });
    }
  };
