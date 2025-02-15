import { useEffect, useReducer, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { initialUserState, userReducer } from "../reducers/userReducer";
import {
  getUserData,
  isAdmin,
  isAuthenticated,
  isUser,
  logout,
  updateUserAction,
} from "../actions/userActions";
import NotificationAlert from "../components/NotificationAlert";

const EditMyProfilePage = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const navigate = useNavigate();
  const { user } = userState;
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  //console.log(user);

  const [formData, setFormData] = useState({
    image: user?.imageUser.urlImage || "/default-profile.png",
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    password: "",
    imageFile: null,
  });

  useEffect(() => {
    isAuthenticated(userDispatch);
    isAdmin(userDispatch);
    isUser(userDispatch);
    getUserData(userDispatch);
  }, [userState.isAuthenticated, userState.isAdmin, userState.isUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        image: user?.imageUser.urlImage || "/default-profile.png",
        name: user?.name || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        password: "",
        imageFile: null,
      });
      if (user?.imageUser.urlImage) {
        urlToFile(user.imageUser.urlImage).then((file) => {
          setFormData((prev) => ({ ...prev, imageFile: file }));
        });
      }
    }

    if (userState.successMessage) {
      setAlertOpen(true);
      setTimeout(() => {
        logout(userDispatch);
        navigate("/login");
      }, 3000);
    }

    if (userState.error) setAlertOpen(true);
  }, [user, userState.successMessage, userState.error, navigate]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl, imageFile: file });
    }
  };

  // Convertir una URL de imagen en un archivo File
  const urlToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], "profile-image.jpg", { type: blob.type });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      setErrorPassword(
        "Por favor, ingresa tu contraseña para poder guardar los cambios."
      );
      setAlertOpen(true);
      return;
    }

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("phoneNumber", formData.phoneNumber);
    updatedData.append("email", formData.email);
    if (formData.password) updatedData.append("password", formData.password);
    if (formData.imageFile) updatedData.append("image", formData.imageFile);

    //console.log("Datos a enviar:", Object.fromEntries(updatedData));

    updateUserAction(user.id, updatedData)(userDispatch);

    //Mostrar alerta de exito o error
    //logout
  };

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.container}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Editar mi perfil
        </Typography>

        {/* Vista previa de la imagen */}
        <Avatar src={formData.image} alt="User Avatar" sx={styles.avatar} />

        {/* Input de selección de imagen */}
        <Box sx={styles.fileInputContainer}>
          <InputLabel htmlFor="avatar-upload">Seleccionar imagen</InputLabel>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
        </Box>

        {/* Inputs del formulario */}
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          sx={styles.input}
        />
        <TextField
          fullWidth
          label="Teléfono"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          sx={styles.input}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={styles.input}
        />
        <TextField
          fullWidth
          label="Contraseña"
          name="password"
          type="password"
          onChange={handleInputChange}
          sx={styles.input}
        />

        {/* Botones de acción */}
        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            sx={styles.button}
            onClick={handleSaveChanges}
            disabled={userState.loading}
          >
            {userState.loading ? "Guardando..." : "Guardar cambios"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={styles.button}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
        </Box>
      </Box>

      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={errorPassword || userState.error ? "error" : "success"}
        message={userState.error || userState.successMessage || errorPassword}
      />
    </Box>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#f4f4f4",
    padding: 2,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    maxWidth: 700,
    padding: 4,
    borderRadius: 3,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  avatar: { width: 120, height: 120, borderRadius: "50%", marginBottom: 2 },
  fileInputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 2,
  },
  fileInput: { marginTop: 8 },
  input: { marginBottom: 2 },
  buttonContainer: { display: "flex", gap: 2, marginTop: 2 },
  button: { minWidth: 120 },
};

export default EditMyProfilePage;
