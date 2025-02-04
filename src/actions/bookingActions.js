import ApiService from "../services/ApiService";

export const BOOKING_REQUEST = "BOOKING_REQUEST";
export const BOOKING_SUCCESS = "BOOKING_SUCCESS";
export const BOOKING_FAILURE = "BOOKING_FAILURE";
export const CLEAR_BOOKING_STATE = "CLEAR_BOOKING_STATE";

export const bookRoom = (roomId, userId, bookingData) => async (dispatch) => {
  dispatch({ type: BOOKING_REQUEST });

  try {
    const response = await ApiService.bookRoom(roomId, userId, bookingData);
    dispatch({ type: BOOKING_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response?.data?.error || error.response?.data || "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";
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
