import {
  Box,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  CircularProgress,
  CardActions,
  Button,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  bookingReducer,
  initialBookingState,
} from "../reducers/bookingReducer";
import {
  deleteBookingAction,
  fetchBookingByConfirmationCode,
} from "../actions/bookingActions";
import { Carousel } from "react-bootstrap";
import NotificationAlert from "../components/NotificationAlert";
import MessageDialog from "../components/MessageDialog";
import { useNavigate } from "react-router-dom";

const FindBookingPage = () => {
  const navigate = useNavigate();
  const [bookingState, bookingDispatch] = useReducer(
    bookingReducer,
    initialBookingState
  );
  const [confirmationCode, setConfirmationCode] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (confirmationCode.trim() !== "") {
      fetchBookingByConfirmationCode(confirmationCode)(bookingDispatch);
    }
  }, [confirmationCode]);

  useEffect(() => {
    if (bookingState.successMessage) {
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/reservas");
      }, 2500);
    }
    if (bookingState.error) setAlertOpen(true);
  }, [bookingState.successMessage, bookingState.error, navigate]);

  const booking = bookingState.bookingByConfirmation;

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteBooking = async () => {
    console.log(booking.id);
    await deleteBookingAction(booking.id)(bookingDispatch);
    handleCloseDialog();
  };

  let totalPrice = () => {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(booking.checkInDate);
    const endDate = new Date(booking.checkOutDate);
    const totalDays = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
    return (totalPrice = totalDays * booking.room.roomPrice).toLocaleString();
  };

  return (
    <Box sx={{ p: 2, height: "100%" }}>
      <Typography variant="h4">
        Buscar Reserva por código de confirmación
      </Typography>
      <Typography variant="body1" mt={2}>
        Aquí debes introducir el código de confirmación de la reserva, que
        recibiste por correo o Whatsapp.
      </Typography>

      <Box sx={styles.boxTextField}>
        <TextField
          label="Código de Confirmación"
          variant="outlined"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
      </Box>

      {bookingState.loading && (
        <Box sx={styles.boxCircularProgress}>
          <CircularProgress />
        </Box>
      )}

      {!bookingState.loading && confirmationCode.trim() !== "" && booking && (
        <Box sx={styles.boxCard}>
          <Card sx={styles.card}>
            <Box sx={styles.boxCarousel}>
              <Carousel style={styles.carousel}>
                {booking.room.imagesRoom.map((image) => (
                  <Carousel.Item key={image.id}>
                    <img
                      src={image.urlImage}
                      alt="Imagen de la habitación"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Box>

            <CardContent>
              <Typography variant="h4" gutterBottom>
                Reserva Confirmada
              </Typography>
              <Typography variant="body1">
                <strong>Código:</strong> {booking.confirmationCode}
              </Typography>
              <Typography variant="body1">
                <strong>Tipo de Habitación:</strong> {booking.room.roomType}
              </Typography>
              <Typography variant="body1">
                <strong>Descripción:</strong> {booking.room.roomDescription}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de Entrada:</strong>{" "}
                {new Date(booking.checkInDate).toLocaleDateString("es-ES")}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de Salida:</strong>{" "}
                {new Date(booking.checkOutDate).toLocaleDateString("es-ES")}
              </Typography>
              <Typography variant="body1">
                <strong>Adultos:</strong> {booking.adultsQuantity}
              </Typography>
              <Typography variant="body1">
                <strong>Niños:</strong> {booking.childrenQuantity}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">
                Precio habitación: ${booking.room.roomPrice.toLocaleString()}{" "}
                por noche
              </Typography>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                color="primary"
                mt={2}
              >
                Precio Total: ${totalPrice()}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Box sx={styles.boxButtonCancel}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenDialog(booking)}
                >
                  Cancelar Reserva
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}

      <MessageDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        onConfirm={handleDeleteBooking}
        type="warning"
      >
        {{
          title: "Cancelar Reserva",
          body: (
            <Typography>¿Estás seguro/a de eliminar esta reserva?</Typography>
          ),
        }}
      </MessageDialog>

      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={bookingState.error ? "error" : "success"}
        message={bookingState.error || bookingState.successMessage}
      />
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxTextField: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
    my: 3,
  },
  boxCircularProgress: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },
  boxCard: {
    mt: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: 600,
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
  },
  boxCarousel: {
    display: "flex",
    justifyContent: "center",
  },
  carousel: {
    width: "100%",
    maxWidth: "500px",
    margin: "1rem",
  },
  boxButtonCancel: {
    marginTop: "auto",
    padding: "16px",
  },
};

export default FindBookingPage;
