import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  BreakfastDining,
  Wifi,
  Restaurant,
  RoomService,
  MeetingRoom,
  LocalParking,
  LocalLaundryService,
  MedicalServices,
  Security,
  People,
  Event,
  Business,
  Lock,
} from "@mui/icons-material";

const services = [
  { icon: <BreakfastDining fontSize="large" />, label: "Desayuno Buffet" },
  {
    icon: <Wifi fontSize="large" />,
    label: "WiFi Alta Velocidad en todo el Hotel",
  },
  { icon: <Restaurant fontSize="large" />, label: "Restaurante y Confitería" },
  { icon: <RoomService fontSize="large" />, label: "Room Service" },
  { icon: <MeetingRoom fontSize="large" />, label: "1 Sala de uso múltiple" },
  {
    icon: <LocalParking fontSize="large" />,
    label: "Estacionamiento cubierto en el hotel",
  },
  {
    icon: <LocalLaundryService fontSize="large" />,
    label: "Servicio de Lavandería y Tintorería",
  },
  {
    icon: <People fontSize="large" />,
    label: "Servicio de Conserje y Bell Boy 24 hs",
  },
  {
    icon: <MedicalServices fontSize="large" />,
    label: "Cobertura médica las 24 hs",
  },
  { icon: <Event fontSize="large" />, label: "Gastronomía para Eventos" },
  {
    icon: <Security fontSize="large" />,
    label: "CCTV con monitoreo permanente",
  },
  { icon: <Business fontSize="large" />, label: "Business Center de cortesía" },
  { icon: <Lock fontSize="large" />, label: "Cajas de Seguridad" },
];

const ServicesHotel = () => {
  return (
    <Box sx={styles.boxContainerServices}>
      <Typography variant="h4" gutterBottom>
        Servicios del Hotel
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        sx={styles.gridContainer}
      >
        {services.map((service, index) => (
          <Grid
            key={index}
            size={{ xs: 2, sm: 4, md: 4 }}
            item
            sx={styles.gridIconsService}
          >
            {service.icon}
            <Typography variant="body1" sx={styles.gridLabelsService}>
              {service.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerServices: {
    textAlign: "center",
    padding: "2rem",
  },
  gridContainer: {
    justifyContent: "center",
    paddingTop: "1rem",
  },
  gridIconsService: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gridLabelsService: {
    marginTop: "0.5rem",
  },
};

export default ServicesHotel;
