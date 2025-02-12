import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  bookingReducer,
  initialBookingState,
} from "../reducers/bookingReducer";
import {
  deleteBookingAction,
  fetchBookingByConfirmationCode,
} from "../actions/bookingActions";
import NotificationAlert from "../components/NotificationAlert";
import MessageDialog from "../components/MessageDialog";

const DetailBooking = () => {
  const { confirmationCode } = useParams();
  const [bookingState, bookingDispatch] = useReducer(
    bookingReducer,
    initialBookingState
  );
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookingByConfirmationCode(confirmationCode)(bookingDispatch);
  }, [confirmationCode]);

  useEffect(() => {
    if (bookingState.successMessage) {
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/reservas");
      }, 3000);
    }

    if (bookingState.error) setAlertOpen(true);
  }, [bookingState.successMessage, bookingState.error, navigate]);

  const booking = bookingState.bookingByConfirmation;

  //console.log(booking);

  if (bookingState.loading || !booking)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleDeleteBooking = async () => {
    if (selectedBooking) {
      //console.log("Numero de reserva a eliminar " + selectedBooking.id);
      await deleteBookingAction(selectedBooking.id)(bookingDispatch);
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Detalles de la Reserva
      </Typography>

      <Card sx={{ display: "flex", mb: 3, p: 2, alignItems: "center" }}>
        <Avatar
          src={booking.user.imageUser.urlImage}
          alt={booking.user.name}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <CardContent>
          <Typography variant="h6">{booking.user.name}</Typography>
          <Typography color="text.secondary">
            📩 {booking.user.email}
          </Typography>
          <Typography color="text.secondary">
            📞 {booking.user.phoneNumber}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">Reserva #{booking.id}</Typography>
          <Typography>
            📅 Entrada:{" "}
            {new Date(booking.checkInDate).toLocaleDateString("es-ES")}
          </Typography>
          <Typography>
            📅 Salida:{" "}
            {new Date(booking.checkOutDate).toLocaleDateString("es-ES")}
          </Typography>
          <Typography>
            👥 Huéspedes: {booking.totalGuests} (Adultos:{" "}
            {booking.adultsQuantity}, Niños: {booking.childrenQuantity})
          </Typography>
          <Typography>
            🔑 Código de Confirmación: {booking.confirmationCode}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <Grid container>
          {booking.room.imagesRoom.map((image, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <CardMedia
                component="img"
                height="200"
                image={image.urlImage}
                alt={`Room Image ${index + 1}`}
              />
            </Grid>
          ))}
        </Grid>
        <CardContent>
          <Typography variant="h6">{booking.room.roomType}</Typography>
          <Typography>{booking.room.roomDescription}</Typography>
          <Typography variant="h6" color="primary">
            💰 ${booking.room.roomPrice} / noche
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 3,
          my: 4,
        }}
      >
        <Button
          sx={{ width: "8rem" }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
        <Button
          sx={{ width: "8rem" }}
          variant="contained"
          color="error"
          fullWidth
          onClick={() => handleOpenDialog(booking)}
        >
          Eliminar
        </Button>
      </Box>

      {selectedBooking &&
        (() => {
          const oneDay = 24 * 60 * 60 * 1000;
          const startDate = new Date(selectedBooking.checkInDate);
          const endDate = new Date(selectedBooking.checkOutDate);
          const totalDays =
            Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
          const totalPrice = totalDays * selectedBooking.room.roomPrice;
          return (
            <MessageDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              onConfirm={handleDeleteBooking}
              type="warning"
            >
              {{
                title: "Cancelar Reserva",
                body: (
                  <Box>
                    <Typography>
                      ¿Estás seguro/a de eliminar la siguiente reserva?
                    </Typography>
                    <Typography>
                      🏨 Tipo de Habitación: {selectedBooking.room.roomType}
                    </Typography>
                    <Typography>
                      💰 Precio por noche: $
                      {selectedBooking.room.roomPrice.toLocaleString()}
                    </Typography>
                    <Typography>
                      📅 Entrada:{" "}
                      {new Date(selectedBooking.checkInDate).toLocaleDateString(
                        "es-ES"
                      )}
                    </Typography>
                    <Typography>
                      📅 Salida:{" "}
                      {new Date(
                        selectedBooking.checkOutDate
                      ).toLocaleDateString("es-ES")}
                    </Typography>
                    <Typography>
                      👥 Cantidad de Huéspedes: {selectedBooking.totalGuests}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      💰 Precio Total: ${totalPrice.toLocaleString()}
                    </Typography>
                  </Box>
                ),
              }}
            </MessageDialog>
          );
        })()}

      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={bookingState.error ? "error" : "success"}
        message={bookingState.error || bookingState.successMessage}
      />
    </Box>
  );
};

export default DetailBooking;

