import { useEffect, useReducer, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { getUserBookingsAction, getUserData } from "../actions/userActions";
import MessageDialog from "./MessageDialog";
import {
  bookingReducer,
  initialBookingState,
} from "../reducers/bookingReducer";
import NotificationAlert from "./NotificationAlert";
import { deleteBookingAction } from "../actions/bookingActions";

const MyBookings = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [bookingState, bookingDispatch] = useReducer(
    bookingReducer,
    initialBookingState
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  //console.log(userState);

  useEffect(() => {
    getUserData(userDispatch);
  }, []);

  useEffect(() => {
    if (userState.user?.id) {
      getUserBookingsAction(userState.user.id)(userDispatch);
    }

    if (userState.error) setAlertOpen(true);

    if (bookingState.successMessage) {
      setAlertOpen(true);
    }

    if (bookingState.error) setAlertOpen(true);
  }, [
    userState.user?.id,
    userState.error,
    bookingState.successMessage,
    bookingState.error,
  ]);

  if (userState.loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  }

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
      getUserBookingsAction(userState.user.id)(userDispatch);
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ padding: 4, height: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Mis Reservas
      </Typography>

      {userState.userBookings?.bookings?.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
        >
          No tienes ninguna reserva.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {userState.userBookings?.bookings?.map((booking) => {
            const oneDay = 24 * 60 * 60 * 1000;
            const startDate = new Date(booking.checkInDate);
            const endDate = new Date(booking.checkOutDate);
            const totalDays =
              Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
            const totalPrice = totalDays * booking.room.roomPrice;
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                key={booking.id}
                sx={{ height: "100%" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {booking.room.imagesRoom.length > 0 && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={booking.room.imagesRoom[0].urlImage}
                      alt={booking.room.roomType}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      {booking.room.roomType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {booking.room.roomDescription}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Entrada:</strong> {booking.checkInDate}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Salida:</strong> {booking.checkOutDate}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Huéspedes:</strong> {booking.totalGuests}{" "}
                      (Adultos: {booking.adultsQuantity}, Niños:{" "}
                      {booking.childrenQuantity})
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mt: 1, fontWeight: "bold" }}
                    >
                      Código de Confirmación: {booking.confirmationCode}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Precio por noche:</strong> $
                      {booking.room.roomPrice.toLocaleString()}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                      Precio Total: ${totalPrice.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDialog(booking)}
                      >
                        Cancelar Reserva
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

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
                      ¿{userState.user?.name}, estás seguro/a de eliminar la
                      siguiente reserva?
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

export default MyBookings;
