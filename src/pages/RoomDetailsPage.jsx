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
import { clearRoomDetails, fetchRoomDetails } from "../actions/RoomActions";
import {
  getUserData,
  isAdmin,
  isAuthenticated,
  isUser,
} from "../actions/userActions";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { Carousel } from "react-bootstrap";

const RoomDetailsPage = () => {
  const [roomState, roomDispatch] = useReducer(roomReducer, initialRoomState);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [showBooking, setShowBooking] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const { roomId } = useParams();
  const navigate = useNavigate();

  //console.log(userState.user.id);

  useEffect(() => {
    isAuthenticated(userDispatch);
    isAdmin(userDispatch);
    isUser(userDispatch);
    getUserData(userDispatch);
    fetchRoomDetails(roomId)(roomDispatch);
    return () => {
      roomDispatch(clearRoomDetails());
    };
  }, [roomId, userState.isAuthenticated, navigate]);

  const { selectedRoom } = roomState;

  if (!selectedRoom) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  const handleButtonClick = () => {
    if (!userState.isAuthenticated) {
      navigate("/login");
      return;
    }

    if (userState.isAdmin) {
      navigate(`/editar/${roomId}`);
    } else {
      setShowBooking(true);
    }
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
              Precio: ${selectedRoom.roomPrice}
            </Typography>
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={styles.button}
              onClick={handleButtonClick}
            >
              {userState.isAdmin ? "Editar" : "Reservar"}
            </Button>
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
                    format="DD/MM/YYYY"
                    defaultValue={dayjs(new Date())}
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                  <DatePicker
                    label="Check-Out"
                    format="DD/MM/YYYY"
                    defaultValue={dayjs(new Date())}
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                </Box>
              </LocalizationProvider>
              <Box sx={styles.boxInputsGuests}>
                <TextField
                  label="Adultos"
                  type="number"
                  variant="outlined"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  input={{ min: 1 }}
                  sx={styles.guestInput}
                />
                <TextField
                  label="Niños"
                  type="number"
                  variant="outlined"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
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
                >
                  Guardar Reserva
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
      </Box>
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
    gap: 3,
    marginTop: "3rem",
  },
};

export default RoomDetailsPage;
