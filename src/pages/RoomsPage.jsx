/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import RoomSearch from "../components/RoomSearch";
import { roomReducer, initialRoomState } from "../reducers/roomReducer";
import {
  FETCH_ROOMS,
  fetchRoomsAction,
  fetchRoomTypesAction,
  changeRoomTypeAction,
  changePageAction,
} from "../actions/roomActions";
import NotificationAlert from "../components/NotificationAlert";
import RoomsResult from "../components/RoomsResult";
import CustomPagination from "../components/CustomPagination";
import { useNavigate } from "react-router-dom";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { isAdmin } from "../actions/userActions";

const RoomsPage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(roomReducer, initialRoomState);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
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
      await fetchRoomsAction()(dispatch);
    };
    const fetchRoomTypes = async () => {
      await fetchRoomTypesAction()(dispatch);
    };
    fetchRooms();
    fetchRoomTypes();

    isAdmin(userDispatch);
  }, []);

  const handleRoomTypeChange = (e) => {
    const type = e.target.value;
    changeRoomTypeAction(type)(dispatch);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(
    Math.max(0, indexOfFirstRoom),
    Math.min(filteredRooms.length, indexOfLastRoom)
  );

  const paginate = (pageNumber) => changePageAction(pageNumber)(dispatch);

  return (
    <Box sx={styles.boxContainerRoomsPage}>
      <Box sx={styles.boxContainerTitleAndCreateButton}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Habitaciones
        </Typography>
        {userState.isAdmin && (
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => navigate("/admin/habitaciones/crear")}
          >
            Crear Habitación
          </Button>
        )}
      </Box>

      <FormControl required sx={{ minWidth: 200 }}>
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
      gap: 3,
    },
  },
  boxContainerTitleAndCreateButton: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: 1,
      mb: 2,
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
      gap: 3,
      textAlign: "center",
    },
  },
};

export default RoomsPage;
