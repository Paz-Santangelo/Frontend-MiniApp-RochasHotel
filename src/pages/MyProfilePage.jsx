import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  deleteUserAction,
  getUserData,
  isAdmin,
  isAuthenticated,
  isUser,
  logout,
} from "../actions/userActions";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import MessageDialog from "../components/MessageDialog";
import NotificationAlert from "../components/NotificationAlert";

const MyProfilePage = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    isAuthenticated(userDispatch);
    isAdmin(userDispatch);
    isUser(userDispatch);
    getUserData(userDispatch);
  }, [userState.isAuthenticated, userState.isAdmin, userState.isUser]);

  useEffect(() => {
    if (userState.successMessage) {
      setAlertOpen(true);
      setTimeout(() => {
        logout(userDispatch);
        navigate("/");
      }, 3000);
    }

    if (userState.error) setAlertOpen(true);
  }, [userState.successMessage, userState.error, navigate]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleDeleteUser = async () => {
    await deleteUserAction(userState.user?.id)(userDispatch);
    setOpenDialog(false);
  };

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
            onClick={() => navigate("/perfil/editar")}
          >
            Modificar
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={styles.button}
            onClick={handleOpenDialog}
          >
            Eliminar
          </Button>
        </Box>

        <NotificationAlert
          open={alertOpen}
          onClose={handleCloseAlert}
          severity={userState.error ? "error" : "success"}
          message={userState.error || userState.successMessage}
        />

        <MessageDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          onConfirm={handleDeleteUser}
          type="warning"
        >
          {{
            title: "Eliminar Perfil",
            body: `¿${userState.user?.name} estás seguro/a de eliminar tu perfil?`,
          }}
        </MessageDialog>
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

export default MyProfilePage;
