import ApiService from "../services/ApiService";

export const FETCH_ROOMS = "FETCH_ROOMS";
export const FETCH_ROOM_TYPES = "FETCH_ROOM_TYPES";
export const FETCH_ROOMS_FAILURE = "FETCH_ROOMS_FAILURE";
export const SET_SELECTED_ROOM_TYPE = "SET_SELECTED_ROOM_TYPE";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FETCH_ROOM_DETAILS = "FETCH_ROOM_DETAILS";
export const CLEAR_ROOM_DETAILS = "CLEAR_ROOM_DETAILS";

export const fetchRoomsAction = () => async (dispatch) => {
  try {
    const allRooms = await ApiService.getAllRooms();
    //console.log(allRooms);

    dispatch({ type: FETCH_ROOMS, payload: allRooms.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor.";

    dispatch({ type: FETCH_ROOMS_FAILURE, payload: message });
  }
};

export const fetchRoomTypesAction = () => async (dispatch) => {
  try {
    const types = await ApiService.getRoomTypes();
    //console.log(types.data);

    dispatch({ type: FETCH_ROOM_TYPES, payload: types });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor.";

    dispatch({ type: FETCH_ROOMS_FAILURE, payload: message });
  }
};

export const changeRoomTypeAction = (type) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ROOM_TYPE, payload: type });
  dispatch({ type: FILTER_ROOMS, payload: type });
};

export const changePageAction = (page) => (dispatch) => {
  dispatch({ type: SET_CURRENT_PAGE, payload: page });
};

export const fetchRoomDetails = (roomId) => async (dispatch) => {
  try {
    const response = await ApiService.getRoomById(roomId);
    dispatch({
      type: FETCH_ROOM_DETAILS,
      payload: response,
    });
  } catch (error) {
    console.error("Error fetching room details:", error);
  }
};

export const fetchAvailableRoomsByDateAndType =
  (startDate, endDate, roomType) => async (dispatch) => {
    try {
      const response = await ApiService.getAvailableRoomsByDateAndType(
        startDate,
        endDate,
        roomType
      );
      dispatch({
        type: FETCH_ROOMS,
        payload: response.data,
      });
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data ||
        "Error de conexión con el servidor.";

      dispatch({ type: FETCH_ROOMS_FAILURE, payload: message });
    }
  };

export const clearRoomDetails = () => ({
  type: CLEAR_ROOM_DETAILS,
});
