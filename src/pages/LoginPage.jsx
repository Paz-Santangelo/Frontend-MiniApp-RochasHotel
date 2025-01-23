import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { login } from "../actions/userActions";
import NotificationAlert from "../components/NotificationAlert";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(dispatch, { email, password });
    setAlertOpen(true);
  };

  useEffect(() => {
    if (state.user !== null && state.error === null) {
     //console.log(state);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [state.user, state.error]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 71.58px)",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1.5rem" }}>
          Ingresá
        </Typography>
        <TextField
          fullWidth
          label="Correo electrónico"
          variant="outlined"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleLogin}
          disabled={state.loading}
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

export default LoginPage;
