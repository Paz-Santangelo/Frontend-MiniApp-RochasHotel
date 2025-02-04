import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import NotificationAlert from "../components/NotificationAlert";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";

const LoginPage = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  //console.log(state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  //console.log(state);
  const validateInputs = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.trim().length > 0;

    setErrors({
      email: !emailValid || email.trim().length === 0,
      password: !passwordValid,
    });

    return emailValid && passwordValid;
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      await login(dispatch, { email, password });
      setAlertOpen(true);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);

    const isEmailFilled = email.trim().length > 0 || e.target.name === "email";
    const isPasswordFilled =
      password.trim().length > 0 || e.target.name === "password";

    setIsButtonDisabled(!(isEmailFilled && isPasswordFilled));
  };

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      navigate("/profile");
    }
  }, [state.isAuthenticated, state.user, navigate]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={styles.boxContainerLoginPage}>
      <Box sx={styles.boxContainerLogin}>
        <Typography variant="h4" sx={{ marginBottom: "1.5rem" }}>
          Ingresá
        </Typography>
        <TextField
          fullWidth
          label="Correo electrónico"
          variant="outlined"
          type="email"
          name="email"
          margin="normal"
          value={email}
          onChange={handleInputChange(setEmail)}
          error={errors.email}
          helperText={
            errors.email ? "Por favor, ingresa un correo válido." : ""
          }
        />
        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          type="password"
          name="password"
          margin="normal"
          value={password}
          onChange={handleInputChange(setPassword)}
          error={errors.password}
          helperText={
            errors.password ? "La contraseña no puede estar vacía." : ""
          }
        />
        <Button
          variant="contained"
          color="primary"
          sx={styles.buttonLogin}
          onClick={handleLogin}
          disabled={state.loading || isButtonDisabled}
        >
          {state.loading ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </Box>

      {/* Mostrar notificación */}
      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={state.error ? "error" : "success"}
        message={
          state.error
            ? state.error
            : state.user
            ? "Inicio de sesión exitoso"
            : ""
        }
      />
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerLoginPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 71.58px)",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
  },
  boxContainerLogin: {
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
  buttonLogin: {
    marginTop: "1.5rem",
    padding: "0.75rem",
    fontWeight: "bold",
    width: "100%",
  },
};

export default LoginPage;
