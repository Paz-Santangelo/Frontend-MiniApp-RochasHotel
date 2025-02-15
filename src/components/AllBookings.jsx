import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
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
import CustomPagination from "./CustomPagination";
import NotificationAlert from "./NotificationAlert";

const AllBookings = () => {
  const [bookingState, bookingDispatch] = useReducer(
    bookingReducer,
    initialBookingState
  );

  const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 6;
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    getAllBookings()(bookingDispatch);
  }, []);

  useEffect(() => {
    setFilteredBookings(bookingState.allBookings);

    if (bookingState.error) setAlertOpen(true);
  }, [bookingState.allBookings, bookingState.error]);

  const handleSearch = () => {
    if (confirmationCode.trim() === "") {
      getAllBookings()(bookingDispatch);
    } else {
      fetchBookingByConfirmationCode(confirmationCode)(bookingDispatch);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderBookingCard = (booking) => (
    <Card sx={styles.card} key={booking.id}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Código: {booking.confirmationCode}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de entrada:</strong> {new Date(booking.checkInDate).toLocaleDateString("es-ES")}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha de salida:</strong> {new Date(booking.checkOutDate).toLocaleDateString("es-ES")}
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

      {bookingState.loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      )}

      <Box sx={styles.boxContainerCards}>
        {confirmationCode.trim() && bookingState.bookingByConfirmation
          ? renderBookingCard(bookingState.bookingByConfirmation)
          : currentBookings.map(renderBookingCard)}
      </Box>

      {filteredBookings.length > bookingsPerPage && (
        <CustomPagination
          roomsPerPage={bookingsPerPage}
          totalRooms={filteredBookings.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}

      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={bookingState.error ? "error" : ""}
        message={bookingState.error}
      />
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
