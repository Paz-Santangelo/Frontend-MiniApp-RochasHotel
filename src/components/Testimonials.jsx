import { Typography, Box, Card, CardContent } from "@mui/material";
import { Carousel } from "react-bootstrap";

const testimonials = [
  {
    name: "Juan Pérez",
    comment: "La atención fue excelente, ¡un lugar que volvería a visitar!",
  },
  {
    name: "María López",
    comment: "El desayuno buffet es increíble y el WiFi realmente rápido.",
  },
  {
    name: "Carlos Sánchez",
    comment: "Las habitaciones son muy cómodas y el servicio fue impecable.",
  },
  {
    name: "Ana García",
    comment: "El personal es muy amable y la ubicación del hotel es perfecta.",
  },
  {
    name: "Pedro Rodríguez",
    comment:
      "¡Me encantó la experiencia! Todo estuvo bien organizado y el ambiente es muy relajante.",
  },
];

const Testimonials = () => (
  <Box sx={{ margin: "4rem" }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        Testimonios de nuestros clientes
      </Typography>
    </Box>
    <Carousel style={{ padding: "0 2rem"}}>
      {testimonials.map((testimonial, index) => (
        <Carousel.Item key={index}>
          <Box sx={styles.boxCardCarouselItem}>
            <Card sx={styles.card}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.comment}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Carousel.Item>
      ))}
    </Carousel>
  </Box>
);

/** @type {import("@mui/material").SxProps} */
const styles = {
  boxCardCarouselItem: {
    display: "flex",
    justifyContent: "center",
    p: 2,
  },
  card: {
    maxWidth: { xs: "90%", sm: 400, md: 345 },
    width: "100%",
    boxShadow: "0px 2px 4px 4px rgba(0, 0, 0, 0.06)",
    borderRadius: "8px",
    backgroundColor: "white",
  },
};

export default Testimonials;
