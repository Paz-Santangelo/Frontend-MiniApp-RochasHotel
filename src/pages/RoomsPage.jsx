/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import RoomSearch from "../components/RoomSearch";
import ApiService from "../services/ApiService";
import { roomReducer, initialRoomState } from "../reducers/roomReducer";
import {
  FETCH_ROOMS,
  FETCH_ROOM_TYPES,
  SET_SELECTED_ROOM_TYPE,
  FILTER_ROOMS,
  SET_CURRENT_PAGE,
} from "../actions/RoomActions";
import NotificationAlert from "../components/NotificationAlert";
import RoomsResult from "../components/RoomsResult";
import CustomPagination from "../components/CustomPagination";

const RoomsPage = () => {
  const [state, dispatch] = useReducer(roomReducer, initialRoomState);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    rooms,
    filteredRooms,
    roomTypes,
    selectedRoomType,
    currentPage,
    roomsPerPage,
  } = state;

  const showAlert = (message, severity = "success") => {
    setAlertState({ open: true, message, severity });
  };

  const handleAlertClose = () => {
    setAlertState((prevState) => ({ ...prevState, open: false }));
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allRooms = await ApiService.getAllRooms();
        dispatch({ type: FETCH_ROOMS, payload: allRooms });
      } catch (error) {
        console.error(
          "Error al obtener todas las habitaciones:",
          error.message
        );
        showAlert(
          "Error al obtener todas las habitaciones, inténtelo nuevamente más tarde: ",
          "error"
        );
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        dispatch({ type: FETCH_ROOM_TYPES, payload: types });
      } catch (error) {
        console.error(
          "Error al traer los tipos de habitaciones, intentelo mas tarde:",
          error.message
        );
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    const type = e.target.value;
    dispatch({ type: SET_SELECTED_ROOM_TYPE, payload: type });
    dispatch({ type: FILTER_ROOMS, payload: type });
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(
    Math.max(0, indexOfFirstRoom),
    Math.min(filteredRooms.length, indexOfLastRoom)
  );
  console.log(currentRooms);

  const paginate = (pageNumber) =>
    dispatch({ type: SET_CURRENT_PAGE, payload: pageNumber });

  return (
    <Box sx={styles.boxContainerRoomsPage}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Habitaciones
      </Typography>

      <FormControl required sx={{ minWidth: 300 }}>
        <InputLabel id="demo-simple-select-required-label">
          Filtrar por tipo de habitación:
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={selectedRoomType}
          onChange={handleRoomTypeChange}
          label="Filtrar por tipo de habitación"
        >
          <MenuItem value="all">Todas</MenuItem>
          {roomTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={styles.boxContainerInputsSearch}>
        <RoomSearch
          handleSearchResult={(results) => {
            dispatch({ type: FETCH_ROOMS, payload: results });
            showAlert("Búsqueda completada con éxito", "success");
          }}
          showAlert={showAlert}
        />
      </Box>
      <Box sx={{ margin: "2rem" }}>
        <RoomsResult roomSearchResults={currentRooms} />
      </Box>

      <NotificationAlert
        message={alertState.message}
        severity={alertState.severity}
        open={alertState.open}
        onClose={handleAlertClose}
      />

      <CustomPagination
        roomsPerPage={roomsPerPage}
        totalRooms={filteredRooms.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerRoomsPage: {
    padding: "2rem",
    height: "auto",
    "@media (max-width: 600px)": {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
  },
  boxContainerInputsSearch: {
    marginTop: "2rem",
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: 1,
      textAlign: "center",
    },
  },
};

export default RoomsPage;
