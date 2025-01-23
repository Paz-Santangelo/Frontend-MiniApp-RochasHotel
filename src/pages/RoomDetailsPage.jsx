/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useReducer } from "react";
import { initialRoomState, roomReducer } from "../reducers/roomReducer";
import { useParams } from "react-router-dom";
import { clearRoomDetails, fetchRoomDetails } from "../actions/RoomActions";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "" }}
      onClick={onClick}
    />
  );
}

const RoomDetailsPage = () => {
  const [state, dispatch] = useReducer(roomReducer, initialRoomState);
  const { roomId } = useParams();

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    fetchRoomDetails(roomId)(dispatch);
    return () => {
      dispatch(clearRoomDetails());
    };
  }, [roomId]);

  const { selectedRoom } = state;

  if (!selectedRoom) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {selectedRoom.imagesRoom &&
            selectedRoom.imagesRoom.length > 0 &&
            selectedRoom.imagesRoom.map((image) => (
              <Box
                key={image.id}
                sx={styles.boxImageRoom}
              >
                <img src={image.urlImage} alt={selectedRoom.roomType} />
              </Box>
            ))}
        </Slider>
      </div>
      <Typography variant="h4">{selectedRoom.roomType}</Typography>
      <Typography variant="body1">{selectedRoom.roomDescription}</Typography>
      <Typography variant="h6">Precio: ${selectedRoom.roomPrice}</Typography>
    </>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxImageRoom: {
    display: "flex",
    justifyContent: "center",
    "& img": {
      width: "45%",
      height: "auto",
      margin: "2rem auto",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      "@media (max-width: 600px)": {
        width: "70%",
      },
    },
  },
};

export default RoomDetailsPage;
