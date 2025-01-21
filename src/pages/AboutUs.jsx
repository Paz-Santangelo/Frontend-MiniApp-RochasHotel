import { Box, Typography } from "@mui/material";
import CarouselAbout from "../components/CarouselAbout";

const AboutUs = () => {
  return (
    <Box sx={{ padding: "1rem 2rem" }}>
      <Box sx={styles.boxTextAbout}>
        <Typography variant="h4" gutterBottom>
          Sobre Nosotros
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
          Nuestro hotel nace del sueño de sus dueños, originarios de Buenos
          Aires, quienes, cansados de la vida agitada de la ciudad, decidieron
          apostar por una vida en las Sierras de Córdoba.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
          Inspirados por la tranquilidad y belleza de la región, construyeron un
          hotel pensado para ofrecer una experiencia relajante y renovadora a
          los turistas. Como ex habitantes de una gran ciudad, entienden lo
          importante que es desconectarse del estrés diario y conectar con la
          naturaleza.
        </Typography>
        <Typography variant="body1">
          En nuestro hotel encontrarás un ambiente acogedor, rodeado de paisajes
          espectaculares, ideal para descansar y disfrutar de momentos
          inolvidables.
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ marginTop: "3rem" }}>
        Galería de imágenes de nuestro hotel
      </Typography>

      <Box>
        <CarouselAbout />
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxTextAbout: {
    padding: "2rem",
    backgroundColor: "#fff9e6",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    margin: "2rem auto",
    textAlign: "center",
  },
};

export default AboutUs;
