import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  bookingReducer,
  initialBookingState,
} from "../reducers/bookingReducer";
import {
  fetchBookingByConfirmationCode,
  getAllBookings,
} from "../actions/bookingActions";
import { useNavigate } from "react-router-dom";

const AllBookings = () => {
  const [bookingState, bookingDispatch] = useReducer(
    bookingReducer,
    initialBookingState
  );

  //console.log(bookingState)
  const [confirmationCode, setConfirmationCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllBookings()(bookingDispatch);
  }, []);

  const handleSearch = () => {
    if (confirmationCode.trim() === "") {
      getAllBookings()(bookingDispatch);
    } else {
      fetchBookingByConfirmationCode(confirmationCode)(bookingDispatch);
    }
  };

  const renderBookingCard = (booking) => (
    <Card sx={styles.card} key={booking.id}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Código: {booking.confirmationCode}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de entrada:</strong> {booking.checkInDate}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de salida:</strong> {booking.checkOutDate}
        </Typography>
        <Typography variant="body1">
          <strong>Adultos:</strong> {booking.adultsQuantity}
        </Typography>
        <Typography variant="body1">
          <strong>Niños:</strong> {booking.childrenQuantity}
        </Typography>
        <Typography variant="body1">
          <strong>Total de huéspedes:</strong> {booking.totalGuests}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() =>
            navigate(`/admin/reservas/${booking.confirmationCode}`)
          }
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Todas las reservas
      </Typography>

      <Box sx={styles.boxTextFieldAndButton}>
        <TextField
          label="Código de Confirmación"
          variant="outlined"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      {bookingState.loading && <Typography>Cargando...</Typography>}
      {bookingState.error && (
        <Typography color="error">{bookingState.error}</Typography>
      )}

      <Box sx={styles.boxContainerCards}>
        {confirmationCode.trim() && bookingState.bookingByConfirmation
          ? renderBookingCard(bookingState.bookingByConfirmation)
          : bookingState.allBookings.map(renderBookingCard)}
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxTextFieldAndButton: {
    display: "flex",
    gap: 2,
    my: 3,
    flexWrap: "wrap",
  },
  boxContainerCards: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: "center",
  },
  card: {
    width: 350,
    m: 2,
    boxShadow: 3,
    borderRadius: 3,
    padding: 2,
  },
};

export default AllBookings;
