import {
  FETCH_ROOMS,
  FETCH_ROOM_TYPES,
  SET_SELECTED_ROOM_TYPE,
  FILTER_ROOMS,
  SET_CURRENT_PAGE,
  FETCH_ROOM_DETAILS,
  CLEAR_ROOM_DETAILS,
} from "../actions/RoomActions";

const initialState = {
  rooms: [],
  filteredRooms: [],
  roomTypes: [],
  selectedRoomType: "all",
  currentPage: 1,
  roomsPerPage: 6,
  selectedRoom: null,
};

export const roomReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        filteredRooms: action.payload,
      };
    case FETCH_ROOM_TYPES:
      return {
        ...state,
        roomTypes: action.payload,
      };
    case SET_SELECTED_ROOM_TYPE:
      return {
        ...state,
        selectedRoomType: action.payload,
      };
    case FILTER_ROOMS:
      return {
        ...state,
        filteredRooms:
          action.payload === "all"
            ? state.rooms
            : state.rooms.filter((room) => room.roomType === action.payload),
        currentPage: 1,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case FETCH_ROOM_DETAILS:
      return {
        ...state,
        selectedRoom: action.payload,
      };
    case CLEAR_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: null,
      };
    default:
      return state;
  }
};

export const initialRoomState = initialState;
