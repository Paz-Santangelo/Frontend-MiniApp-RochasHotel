import {
  FETCH_ROOMS,
  FETCH_ROOM_TYPES,
  SET_SELECTED_ROOM_TYPE,
  FILTER_ROOMS,
  SET_CURRENT_PAGE,
  FETCH_ROOM_DETAILS,
  CLEAR_ROOM_DETAILS,
  FETCH_ROOMS_FAILURE,
  UPDATE_ROOM,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAILURE,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAILURE,
  ADD_ROOM,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_FAILURE,
} from "../actions/roomActions";

const initialState = {
  rooms: [],
  filteredRooms: [],
  error: null,
  loading: false,
  roomTypes: [],
  selectedRoomType: "all",
  currentPage: 1,
  roomsPerPage: 6,
  selectedRoom: null,
  successMessage: null,
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
    case FETCH_ROOMS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ROOM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.id ? action.payload : room
        ),
        filteredRooms: state.filteredRooms.map((room) =>
          room.id === action.payload.id ? action.payload : room
        ),
        selectedRoom: action.payload,
        successMessage: "Habitación actualizada con éxito.",
      };
    case UPDATE_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: state.rooms.filter((room) => room.id !== action.payload.roomId),
        successMessage: action.payload,
      };
    case DELETE_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };
    case ADD_ROOM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.payload,
      };
    case ADD_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };
    default:
      return state;
  }
};

export const initialRoomState = initialState;
