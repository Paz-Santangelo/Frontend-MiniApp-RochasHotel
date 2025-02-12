/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ApiService from "../services/ApiService";
import dayjs from "dayjs";

const RoomSearch = ({ handleSearchResult, showAlert }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error(
          "Error al obtener los tipos de habitaciones:",
          error.message || error
        );
        showAlert(
          "Error al cargar los tipos de habitación. Inténtelo más tarde.",
          "error"
        );
      }
    };
    fetchRoomTypes();
  }, []);

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showAlert("Todos los campos son obligatorios.", "warning");
      return;
    }

    if (startDate.isAfter(endDate)) {
      showAlert(
        "La fecha de Check-In debe ser anterior a la de Check-Out.",
        "warning"
      );
      return;
    }

    setIsLoading(true);

    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const response = await ApiService.getAvailableRoomsByDateAndType(
        formattedStartDate,
        formattedEndDate,
        roomType
      );

      handleSearchResult(response.data);
      showAlert("Habitaciones encontradas correctamente", "success");
    } catch (error) {
      //console.error("Error al buscar habitaciones:", error.message);
      const message =
        error.response?.data?.error ||
        error.response?.data ||
        "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

      showAlert(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !startDate || !endDate || !roomType;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={styles.boxContainerInputsDatePicker}>
          <DatePicker
            label="Check-In"
            value={startDate}
            format="DD/MM/YYYY"
            defaultValue={dayjs(new Date())}
            onChange={(date) => setStartDate(date)}
            slotProps={{ textField: { variant: "outlined" } }}
          />
          <DatePicker
            label="Check-Out"
            value={endDate}
            format="DD/MM/YYYY"
            defaultValue={dayjs(new Date())}
            onChange={(date) => setEndDate(date)}
            slotProps={{ textField: { variant: "outlined" } }}
          />
        </Box>
      </LocalizationProvider>

      <FormControl required sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-required-label">Tipos</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          label="Tipos *"
        >
          {roomTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleInternalSearch}
        disabled={isLoading || isButtonDisabled}
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </Button>
    </>
  );
};

const styles = {
  boxContainerInputsDatePicker: {
    display: "flex",
    gap: 2,
    "@media (max-width: 600px)": {
      display: "flex",
      flexDirection: "column",
      gap: 3,
    },
  },
};

export default RoomSearch;
