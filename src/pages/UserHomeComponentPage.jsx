import { useEffect, useReducer } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { isAdmin, isUser } from "../actions/userActions";

const UserHomeComponentPage = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  //console.log(userState);
  useEffect(() => {
    isAdmin(userDispatch);
    isUser(userDispatch);
  }, [userState.isAdmin, userState.isUser, userDispatch]);

  return (
    <Box sx={styles.boxContainerUserHome}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            {userState.isAdmin ? "Panel de Administración" : `Bienvenido/a`}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {userState.isAdmin ? (
            <>
              <Typography variant="body1" gutterBottom>
                Como administrador, tienes acceso a la gestión del hotel. Para
                cualquier consulta sobre el sistema, contacta al creador del
                software:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Nombre" secondary="Paz Santangelo" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary="paz_santangelo@software.com"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Teléfono"
                    secondary="+54 9 354822334455"
                  />
                </ListItem>
              </List>
            </>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Usa el menú lateral a tu izquierda para acceder a las siguientes
                opciones:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Perfil"
                    secondary="Edita y visualiza tu información personal."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Reservar"
                    secondary="Haz una nueva reserva en el hotel."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Buscar reserva"
                    secondary="Encuentra una reserva con su código de confirmación."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Mis reservas"
                    secondary="Consulta todas tus reservas activas y pasadas."
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary" align="center">
                ¿Problemas o consultas? Contáctanos:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="WhatsApp"
                    secondary="+54 354822334455"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Teléfono"
                    secondary="+54 354844556677"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary="rochas_hotel@contacto.com"
                  />
                </ListItem>
              </List>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerUserHome: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 71.58px)",
    padding: "2rem",
  },
  card: {
    maxWidth: 600,
    width: "90%",
    boxShadow: 3,
    borderRadius: 2,
  },
};

export default UserHomeComponentPage;
