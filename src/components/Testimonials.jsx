import {
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import Slider from "react-slick";

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
    comment: "¡Me encantó la experiencia! Todo estuvo bien organizado y el ambiente es muy relajante.",
  },
  {
    name: "Lucía Martínez",
    comment: "Una estancia maravillosa, el spa y la piscina son espectaculares.",
  },
  {
    name: "Miguel Fernández",
    comment: "El servicio de limpieza es impecable y la comida del restaurante es deliciosa.",
  },
  {
    name: "Laura González",
    comment: "El ambiente es perfecto para descansar, sin duda volveré en mi próxima visita.",
  },
  {
    name: "David Herrera",
    comment: "La habitación estaba muy limpia y bien equipada. La atención al cliente es de primera.",
  },
  {
    name: "Sara Rodríguez",
    comment: "Me sentí como en casa, un lugar ideal para desconectar y disfrutar de la tranquilidad.",
  },
];

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 1500,
  responsive: [
    {
      breakpoint: 1024, // Pantallas medianas, tabletas
      settings: {
        slidesToShow: 2, // Mostrar 2 tarjetas
      },
    },
    {
      breakpoint: 600, // Pantallas pequeñas, móviles
      settings: {
        slidesToShow: 1, // Mostrar 1 tarjeta
      },
    },
  ],
};

const Testimonials = () => (
  <>
    <Box sx={{ margin: "2rem" }}>
      <Box>
        <Typography variant="h4">Testimonios de nuestros clientes</Typography>
      </Box>
      <div className="slider-container">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ p: 2 }}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: "0px 2px 4px 4px rgba(0, 0, 0, 0.06)", 
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              >
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
          ))}
        </Slider>
      </div>
    </Box>
  </>
);

export default Testimonials;
