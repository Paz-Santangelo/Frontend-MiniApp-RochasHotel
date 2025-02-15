import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { initialRoomState, roomReducer } from "../reducers/roomReducer";
import {
  getUserData,
  isAdmin,
  isAuthenticated,
  isUser,
} from "../actions/userActions";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { Carousel } from "react-bootstrap";
import {
  clearRoomDetails,
  deleteRoomAction,
  fetchRoomDetails,
} from "../actions/roomActions";
import { bookingReducer } from "../reducers/bookingReducer";
import NotificationAlert from "../components/NotificationAlert";
import { bookRoom } from "../actions/bookingActions";
import MessageDialog from "../components/MessageDialog";

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomState, roomDispatch] = useReducer(roomReducer, initialRoomState);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [bookingState, bookingDispatch] = useReducer(bookingReducer, {
    loading: false,
    success: false,
    error: null,
    bookingDetails: null,
  });
  const [showBooking, setShowBooking] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adultsQuantity, setAdultsQuantity] = useState(1);
  const [childrenQuantity, setChildrenQuantity] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contentMessageDialog, setContentMessageDialog] = useState({
    roomType: "",
    checkInDate: null,
    checkOutDate: null,
    totalGuests: "",
    totalPrice: "",
  });

  useEffect(() => {
    isAuthenticated(userDispatch);
    isAdmin(userDispatch);
    isUser(userDispatch);
    getUserData(userDispatch);
    fetchRoomDetails(roomId)(roomDispatch);
    return () => {
      roomDispatch(clearRoomDetails());
    };
  }, [roomId, navigate]);

  useEffect(() => {
    if (roomState.successMessage) {
      setOpenDialog(false);
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/habitaciones");
      }, 3000);
    }
    if (roomState.error) {
      setOpenDialog(false);
      setAlertOpen(true);
    }

    if (bookingState.bookingDetails) {
      setOpenDialog(false);
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/reservas");
      }, 3000);
    }

    if (bookingState.error) {
      setOpenDialog(false);
      setAlertOpen(true);
    }
  }, [
    roomState.successMessage,
    roomState.error,
    bookingState.bookingDetails,
    bookingState.error,
    navigate,
  ]);

  const { selectedRoom } = roomState;

  if (!selectedRoom) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleOpenDialog = () => {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = checkInDate ? new Date(checkInDate) : new Date();
    const endDate = checkOutDate ? new Date(checkOutDate) : new Date();
    const totalDays = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
    const totalGuests = adultsQuantity + childrenQuantity;
    const roomPricePerNight = selectedRoom.roomPrice;
    const totalPrice = totalDays * roomPricePerNight;
    //console.log("Precio total: ", totalPrice);

    setContentMessageDialog({
      roomType: selectedRoom.roomType,
      checkInDate: startDate,
      checkOutDate: endDate,
      totalGuests: totalGuests,
      totalPrice: totalPrice,
    });

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBookingSubmit = () => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    //console.log("Fecha de entrada original: ", startDate);
    //console.log("Fecha de salida original: ", endDate);

    const formattedCheckInDate = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const formattedCheckOutDate = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    //console.log("Fecha de entrada formateada: ", startDate);
    //console.log("Fecha de salida formateada: ", endDate);

    const bookingData = {
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      adultsQuantity: adultsQuantity,
      childrenQuantity: childrenQuantity,
    };

    //console.log("ID de la habitación: ", roomId);
    //console.log("ID del usuario: ", userState.user.id);
    //console.log("Datos de la reserva: ", bookingData);

    bookRoom(roomId, userState.user.id, bookingData)(bookingDispatch);
  };

  const handleConfirmDialog = () => {
    handleBookingSubmit();
    setOpenDialog(false);
  };

  const handleButtonClick = () => {
    if (!userState.isAuthenticated) {
      navigate("/login");
      return;
    }

    if (userState.isAdmin) {
      navigate(`/admin/editar/${roomId}`);
    } else {
      setShowBooking(true);
    }
  };

  const handleButtonCancel = () => {
    if (!userState.isAuthenticated) {
      navigate("/login");
      return;
    }

    if (userState.isAdmin) {
      setContentMessageDialog({
        roomType: selectedRoom.roomType,
        checkInDate: null,
        checkOutDate: null,
        totalGuests: "N/A",
        totalPrice: "N/A",
      });
      setOpenDialog(true);
    } else {
      navigate("/habitaciones");
    }
  };

  const handleDeleteRoom = async () => {
    //console.log("Eliminar habitación:", roomId);
    await deleteRoomAction(roomId)(roomDispatch);
  };

  return (
    <>
      <Box sx={styles.boxContainer}>
        <Container maxWidth="md" sx={styles.containerRoomDetails}>
          <Box sx={styles.carouselContainer}>
            <Carousel fade>
              {selectedRoom.imagesRoom &&
                selectedRoom.imagesRoom.length > 0 &&
                selectedRoom.imagesRoom.map((image) => (
                  <Carousel.Item key={image.id}>
                    <Box key={image.id} sx={styles.boxImageRoom}>
                      <img
                        src={image.urlImage}
                        alt={selectedRoom.roomType}
                        style={{ borderRadius: "10px" }}
                      />
                    </Box>
                  </Carousel.Item>
                ))}
            </Carousel>
          </Box>
          <Box sx={styles.detailsContainer}>
            <Typography variant="h4" sx={styles.title}>
              {selectedRoom.roomType}
            </Typography>
            <Typography variant="body1" sx={styles.description}>
              {selectedRoom.roomDescription}
            </Typography>
            <Typography variant="h6" sx={styles.price}>
              Precio: ${selectedRoom.roomPrice.toLocaleString()}
            </Typography>
            <Box sx={styles.boxButtons}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              sx={styles.button}
              onClick={handleButtonClick}
            >
              {userState.isAdmin ? "Editar" : "Reservar"}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              sx={styles.button}
              onClick={handleButtonCancel}
            >
              {userState.isAdmin ? "Eliminar" : "Cancelar"}
            </Button>
            </Box>
          </Box>
        </Container>
        {showBooking && (
          <Container sx={styles.containerBookingRoom}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">
                Rellene los campos para reservar
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={styles.boxInputsDatePicker}>
                  <DatePicker
                    label="Check-In"
                    value={checkInDate || dayjs()}
                    format="DD/MM/YYYY"
                    defaultValue={dayjs(new Date())}
                    onChange={(date) => setCheckInDate(date)}
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                  <DatePicker
                    label="Check-Out"
                    value={checkOutDate}
                    format="DD/MM/YYYY"
                    defaultValue={dayjs(new Date())}
                    onChange={(date) => setCheckOutDate(date)}
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                </Box>
              </LocalizationProvider>
              <Box sx={styles.boxInputsGuests}>
                <TextField
                  label="Adultos"
                  type="number"
                  variant="outlined"
                  value={adultsQuantity}
                  onChange={(e) => setAdultsQuantity(parseInt(e.target.value))}
                  input={{ min: 1 }}
                  sx={styles.guestInput}
                />
                <TextField
                  label="Niños"
                  type="number"
                  variant="outlined"
                  value={childrenQuantity}
                  onChange={(e) =>
                    setChildrenQuantity(parseInt(e.target.value))
                  }
                  input={{ min: 0 }}
                  sx={styles.guestInput}
                />
              </Box>
              <Box sx={styles.boxButtons}>
                <Button
                  size="large"
                  variant="contained"
                  color="success"
                  sx={styles.button}
                  onClick={handleOpenDialog}
                >
                  Confirmar
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="error"
                  sx={styles.button}
                  onClick={() => navigate("/habitaciones")}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Container>
        )}
        <MessageDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          onConfirm={
            userState.isAdmin ? handleDeleteRoom : handleConfirmDialog
          }
          type={userState.isAdmin ? "warning" : "info"}
        >
          {{
            title: userState.isAdmin
              ? "¿Estás seguro/a de eliminar esta habitación?"
              : "Resumen de la reserva",
            body: userState.isAdmin ? (
              <Box>
                <Typography>🏨 {selectedRoom.roomType}</Typography>
                <Typography>📄 {selectedRoom.roomDescription}</Typography>
                <Typography>💰 Precio: ${selectedRoom.roomPrice.toLocaleString()}</Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Detalles:
                </Typography>
                <Typography>🛏️ Tipo: {selectedRoom.roomType}</Typography>

                {contentMessageDialog.checkInDate &&
                  contentMessageDialog.checkOutDate && (
                    <>
                      <Typography>
                        📅 Entrada:{" "}
                        {contentMessageDialog.checkInDate.toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </Typography>
                      <Typography>
                        📅 Salida:{" "}
                        {contentMessageDialog.checkOutDate.toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </Typography>
                    </>
                  )}

                <Typography>
                  👥 Invitados: {contentMessageDialog.totalGuests}
                </Typography>
                <Typography>
                  💰 Total: <strong>${contentMessageDialog.totalPrice}</strong>
                </Typography>
              </Box>
            ),
          }}
        </MessageDialog>
      </Box>

      {/* Mostrar notificación */}
      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={bookingState.error || roomState.error ? "error" : "success"}
        message={
          userState.isAdmin
            ? roomState.error ||
              roomState.successMessage ||
              "Habitación eliminada con éxito."
            : bookingState.error || bookingState.bookingDetails
        }
      />
    </>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  boxContainer: {
    padding: "2rem",
  },
  containerRoomDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    py: "2rem",
  },
  carouselContainer: {
    width: "100%",
    marginBottom: "2rem",
    overflow: "hidden",
  },
  boxImageRoom: {
    "& img": {
      display: "block",
      margin: "0 auto",
      width: "70%",
      height: "auto",
      objectFit: "contain",
      "@media (max-width: 600px)": {
        width: "80%",
      },
    },
  },
  detailsContainer: {
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  description: {
    marginBottom: "1.5rem",
    color: "#666",
  },
  price: {
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#333",
  },
  button: {
    padding: "0.8rem 2rem",
    borderRadius: "8px",
    mx: "1rem",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  containerBookingRoom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "1rem",
  },
  boxInputsDatePicker: {
    display: "flex",
    margin: "2rem",
    gap: 9,
    "@media (max-width: 600px)": {
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
  },
  boxInputsGuests: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    "@media (max-width: 600px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  boxButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginTop: "3rem",
  },
};

export default RoomDetailsPage;
