import ApiService from "../services/ApiService";

export const FETCH_ROOMS = "FETCH_ROOMS";
export const FETCH_ROOM_TYPES = "FETCH_ROOM_TYPES";
export const FETCH_ROOMS_FAILURE = "FETCH_ROOMS_FAILURE";
export const SET_SELECTED_ROOM_TYPE = "SET_SELECTED_ROOM_TYPE";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FETCH_ROOM_DETAILS = "FETCH_ROOM_DETAILS";
export const CLEAR_ROOM_DETAILS = "CLEAR_ROOM_DETAILS";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const UPDATE_ROOM_SUCCESS = "UPDATE_ROOM_SUCCESS";
export const UPDATE_ROOM_FAILURE = "UPDATE_ROOM_FAILURE";
export const DELETE_ROOM_REQUEST = "DELETE_ROOM_REQUEST";
export const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
export const DELETE_ROOM_FAILURE = "DELETE_ROOM_FAILURE";
export const ADD_ROOM = "ADD_ROOM";
export const ADD_ROOM_SUCCESS = "ADD_ROOM_SUCCESS";
export const ADD_ROOM_FAILURE = "ADD_ROOM_FAILURE";

export const fetchRoomsAction = () => async (dispatch) => {
  try {
    const allRooms = await ApiService.getAllRooms();
    //console.log(allRooms);

    dispatch({ type: FETCH_ROOMS, payload: allRooms.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

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
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

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
    console.error("Error al traer la habitación:", error);
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
        "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

      dispatch({ type: FETCH_ROOMS_FAILURE, payload: message });
    }
  };

export const clearRoomDetails = () => ({
  type: CLEAR_ROOM_DETAILS,
});

export const updateRoomAction = (roomId, formData) => async (dispatch) => {
  dispatch({ type: UPDATE_ROOM });

  try {
    const result = await ApiService.updateRoom(roomId, formData);
    //console.log("Room updated:", result.data);

    dispatch({ type: UPDATE_ROOM_SUCCESS, payload: result.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";
    //console.error(message);
    dispatch({ type: UPDATE_ROOM_FAILURE, payload: message });
  }
};

export const deleteRoomAction = (roomId) => async (dispatch) => {
  dispatch({ type: DELETE_ROOM_REQUEST });

  try {
    const response = await ApiService.deleteRoom(roomId);
    //console.log("Habitación eliminada:", response.data);

    dispatch({ type: DELETE_ROOM_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";
    //console.error(message);
    dispatch({ type: DELETE_ROOM_FAILURE, payload: message });
  }
};

export const addRoomAction = (formData) => async (dispatch) => {
  dispatch({ type: ADD_ROOM });

  try {
    const result = await ApiService.addRoom(formData);
    dispatch({ type: ADD_ROOM_SUCCESS, payload: result.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";
    dispatch({ type: ADD_ROOM_FAILURE, payload: message });
  }
};
