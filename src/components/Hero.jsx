import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={styles.boxContainerHero}>
      <img
        src="https://www.cadena3.com/admin/playerswf/fotos/ARCHI_8548831200x771.jpg"
        alt="Vista panorámica del hotel"
        style={styles.heroImage}
      />

      <Box sx={styles.heroContentContainer}>
        <Typography variant="h1" sx={styles.typogaphyTitle}>
          ¡Bienvenidos!
        </Typography>
        <Typography variant="subtitle1" sx={styles.typographySubtitle}>
          Descansa, conecta y respira en Rochas Hotel, ubicado en el corazón de
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
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  },
  heroContentContainer: {
    position: "relative",
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: { xs: "1rem", md: "2rem" },
    borderRadius: "8px",
    margin: "1rem",
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
