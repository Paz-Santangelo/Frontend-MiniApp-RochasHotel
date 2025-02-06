import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useReducer } from "react";
import {
  getUserData,
  isAdmin,
  isAuthenticated,
  isUser,
} from "../actions/userActions";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const navigate = useNavigate();

  //console.log(userState);
  useEffect(() => {
    isAuthenticated(userDispatch);
    isAdmin(userDispatch);
    isUser(userDispatch);
    getUserData(userDispatch);
  }, [userState.isAuthenticated, userState.isAdmin, userState.isUser]);

  const { user } = userState;

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.container}>
        <Avatar
          src={user?.imageUser.urlImage || "/default-profile.png"}
          alt="User Profile"
          sx={styles.avatar}
        />
        <Typography variant="h5" sx={styles.name}>
          {user?.name || "Usuario"}
        </Typography>

        <Box sx={styles.infoContainer}>
          <Typography variant="body1" sx={styles.label}>
            Email:
          </Typography>
          <Typography variant="body1" sx={styles.info}>
            {user?.email || "correo@example.com"}
          </Typography>
        </Box>

        <Box sx={styles.infoContainer}>
          <Typography variant="body1" sx={styles.label}>
            Teléfono:
          </Typography>
          <Typography variant="body1" sx={styles.info}>
            {user?.phoneNumber || "Teléfono no disponible"}
          </Typography>
        </Box>

        <Box sx={styles.infoContainer}>
          <Typography variant="body1" sx={styles.label}>
            Rol:
          </Typography>
          <Typography variant="body1" sx={styles.role}>
            {user?.role || "Rol no especificado"}
          </Typography>
        </Box>

        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            sx={styles.button}
            onClick={() => navigate("/profile/editar")}
          >
            Modificar
          </Button>
          <Button variant="contained" color="error" sx={styles.button}>
            Eliminar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 71.58px)",
    backgroundColor: "#f4f4f4",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    maxWidth: 600,
    padding: 4,
    borderRadius: 3,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    marginBottom: 2,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 1,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    color: "gray",
  },
  role: {
    fontWeight: "500",
    color: "#3f51b5",
  },
  buttonContainer: {
    display: "flex",
    gap: 2,
    marginTop: 2,
  },
  button: {
    minWidth: 120,
  },
};

export default MyProfile;
