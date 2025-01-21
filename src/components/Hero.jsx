import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={styles.boxContainerHero}>
      {/* Video de fondo */}
      <Box
        sx={styles.heroVideo}
      >
        <img src="https://www.cadena3.com/admin/playerswf/fotos/ARCHI_8548831200x771.jpg" alt="Vista panorámica del hotel" />
      </Box>

      {/* Contenido superpuesto */}
      <Box sx={styles.heroContentContainer}>
        <Typography variant="h1" sx={styles.typogaphyTitle}>
          ¡Bienvenidos!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={styles.typographySubtitle}
        >
          Descansa, conecta y respira en Rocha Hotel, ubicado en el corazón de
          las sierras.
        </Typography>
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerHero: {
    position: "relative",
    height: "calc(100vh)",
    width: "100%",
    overflow: "hidden",
  },
  heroVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  },
  heroContentContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: { xs: "1rem", md: "2rem" },
    zIndex: 1,
  },
  typogaphyTitle: {
    fontSize: { xs: "2rem", md: "3.5rem" },
    fontWeight: "bold",
  },
  typographySubtitle: {
    mb: 3,
    fontSize: { xs: "1rem", md: "1.3rem" },
  },
};

export default Hero;
