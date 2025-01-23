import ApiService from "../services/ApiService";

export const FETCH_ROOMS = "FETCH_ROOMS";
export const FETCH_ROOM_TYPES = "FETCH_ROOM_TYPES";
export const SET_SELECTED_ROOM_TYPE = "SET_SELECTED_ROOM_TYPE";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FETCH_ROOM_DETAILS = "FETCH_ROOM_DETAILS";
export const CLEAR_ROOM_DETAILS = "CLEAR_ROOM_DETAILS";

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
  
  export const clearRoomDetails = () => ({
    type: CLEAR_ROOM_DETAILS,
  });