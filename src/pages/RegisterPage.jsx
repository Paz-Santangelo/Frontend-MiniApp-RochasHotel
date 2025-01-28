import { Box, Button, TextField, Typography } from "@mui/material";
import { useReducer, useState } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { registerUser } from "../actions/userActions";
import NotificationAlert from "../components/NotificationAlert";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  //console.log(state);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    phoneNumber: false,
    name: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  // Validar los campos
  const validateFields = () => {
    const newErrors = {
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email),
      password: formValues.password.trim() === "",
      phoneNumber:
        formValues.phoneNumber.trim() === "" || isNaN(formValues.phoneNumber),
      name: formValues.name.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const isFormValid = () => {
    return (
      formValues.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) &&
      formValues.password.trim() !== "" &&
      formValues.phoneNumber.trim() !== "" &&
      !isNaN(formValues.phoneNumber) &&
      formValues.name.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    await registerUser(dispatch, formValues);
    setAlertOpen(true);
    if (!state.error) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    navigate("/login");
  };

  return (
    <Box sx={styles.boxContainerRegisterPage}>
      <Box sx={styles.boxContainerRegister}>
        <Typography variant="h4" gutterBottom>
          Regístrate
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={errors.name}
            helperText={errors.name && "El nombre es obligatorio"}
          />
          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={errors.email}
            helperText={errors.email && "Correo inválido"}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={errors.password}
            helperText={errors.password && "La contraseña no puede estar vacía"}
          />
          <TextField
            label="Número de Teléfono"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={errors.phoneNumber}
            helperText={
              errors.phoneNumber &&
              "El número de teléfono es obligatorio y debe ser válido"
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isFormValid() || state.loading}
          >
            {state.loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <NotificationAlert
          open={alertOpen}
          onClose={handleCloseAlert}
          severity={state.error ? "error" : "success"}
          message={
            state.error
              ? state.error
              : "Registro realizado con éxito. Ya puedes iniciar sesión."
          }
        />
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerRegisterPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 71.58px)",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
  },
  boxContainerRegister: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default RegisterPage;
