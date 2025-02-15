import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { WhatsApp, Email, LocationOn } from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contáctanos
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2, maxWidth: 600 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información de Contacto
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <IconButton color="success">
                  <WhatsApp />
                </IconButton>
                <Typography variant="body1">
                  +54 9 351 123 4567
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <IconButton color="primary">
                  <Email />
                </IconButton>
                <Typography variant="body1">
                  rochas_hotel@contacto.com
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <IconButton color="error">
                  <LocationOn />
                </IconButton>
                <Typography variant="body1">
                  Córdoba, Argentina
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Mapa */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Nuestra Ubicación
          </Typography>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27341.932452702982!2d-64.50198753553467!3d-31.061293516620108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1738086041882!5m2!1ses-419!2sar"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
