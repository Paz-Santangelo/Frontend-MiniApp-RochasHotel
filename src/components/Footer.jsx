import {
  Box,
  Typography,
  Grid2 as Grid,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" sx={styles.boxContainerFooter}>
      <Grid container sx={{ justifyContent: "space-around" }}>
        {/* Enlaces importantes */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Enlaces Importantes
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              <Typography>Servicios</Typography>
            </Link>
          </Box>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              <Typography>Habitaciones</Typography>
            </Link>
          </Box>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              <Typography>Contacto</Typography>
            </Link>
          </Box>
        </Grid>

        {/* Redes sociales */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Seguinos
          </Typography>
          <Box>
            <IconButton href="https://facebook.com" sx={styles.iconsFooter}>
              <Facebook />
            </IconButton>
            <IconButton href="https://instagram.com" sx={styles.iconsFooter}>
              <Instagram />
            </IconButton>
            <IconButton href="https://twitter.com" sx={styles.iconsFooter}>
              <Twitter />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={styles.boxCopyright}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Nuestro Hotel. Todos los derechos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerFooter: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem 1rem",
    mt: "auto",
  },
  iconsFooter: {
    color: "#fff",
    transition: "color 0.3s",
    "&:hover": {
      color: "#eec43b",
    },
  },
  boxCopyright: {
    textAlign: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    marginTop: "1.5rem",
    paddingTop: "1rem",
  },
};

export default Footer;
