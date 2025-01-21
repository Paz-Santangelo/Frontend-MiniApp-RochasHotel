import { Box, Typography, Grid2 as Grid } from "@mui/material";

const AboutHotel = () => {
  return (
    <Box sx={styles.boxContainerAbout}>
      <Grid
        container
        spacing={3}
        columns={{ xs: 1, md: 16 }}
        alignItems="center"
        justifyContent="center"
      >
        {/* Texto a la derecha en pantallas grandes, arriba en pantallas chicas */}
        <Grid size={8}>
          <Typography variant="h4" gutterBottom>
            Un Lugar Único en las Sierras de Córdoba
          </Typography>
          <Typography variant="body1">
            Nuestro hotel está rodeado por la naturaleza y ubicado en el corazón
            de las majestuosas Sierras de Córdoba. Aquí disfrutarás de
            impresionantes vistas panorámicas, aire puro y la tranquilidad que
            buscas para desconectarte.
          </Typography>
          <Typography variant="body1">
            Nos encontramos en un lugar privilegiado, ideal para quienes desean
            explorar senderos, realizar actividades al aire libre o simplemente
            relajarse contemplando el paisaje.
          </Typography>
          <Typography variant="body1">
            ¡Vení a vivir una experiencia inolvidable en contacto con la
            naturaleza!
          </Typography>
        </Grid>
        {/* Imagen a la izquierda en pantallas grandes, abajo en pantallas chicas */}
        <Grid size={8}>
          <Box
            component="img"
            src="https://cordobaturismo.gov.ar/wp-content/uploads/2018/09/16707573_10155792909783840_5514747335741479490_o.jpg"
            alt="Paisaje Sierra Córdoba"
            sx={styles.boxImage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerAbout: {
    padding: "3rem 2rem",
    backgroundColor: "#e6ece7",
  },
  boxImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default AboutHotel;
