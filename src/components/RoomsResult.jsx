/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

const RoomsResult = ({ roomSearchResults }) => {

  return (
    <Grid container spacing={3}>
      {roomSearchResults.map((room) => (
        <Grid item xs={12} sm={6} md={4} key={room.id}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardMedia
              component="img"
              alt={room.roomType}
              height="140"
              image={
                room.imagesRoom.length > 0
                  ? room.imagesRoom[0].urlImage
                  : "https://via.placeholder.com/345x140?text=No+Image"
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {room.roomType}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {room.roomDescription}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Precio: ${room.roomPrice}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "end", p: 0 }}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{ mr: 2, mb: 2 }}
              >
                Ver | Reservar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsResult;
