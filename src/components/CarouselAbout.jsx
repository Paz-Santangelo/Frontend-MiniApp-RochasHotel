/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
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

const Carousel = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Box>
          <img
            style={styles.imageCarousel}
            src="https://www.casonasasturianas.com/wp-content/uploads/casonas-asturianas-hotel-3-cabos-02.jpg"
            alt=""
          />
        </Box>
        <Box>
          <img
            style={{ width: "100%", height: "auto" }}
            src="https://www.casonasasturianas.com/wp-content/uploads/casonas-asturianas-hotel-3-cabos-24.jpg"
            alt=""
          />
        </Box>
        <Box>
          <img
            style={styles.imageCarousel}
            src="https://www.circuitogastronomico.com/wp-content/uploads/2022/07/Portal-del-lago-212.jpg"
            alt=""
          />
        </Box>
        <Box>
          <img
            style={styles.imageCarousel}
            src="https://www.casonasasturianas.com/wp-content/uploads/casonas-asturianas-hotel-3-cabos-05.jpg"
            alt=""
          />
        </Box>
        <Box>
          <img
            style={styles.imageCarousel}
            src="https://www.casonasasturianas.com/wp-content/uploads/casonas-asturianas-hotel-3-cabos-10.jpg"
            alt=""
          />
        </Box>
      </Slider>
    </div>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  imageCarousel: {
    width: "70%",
    height: "auto",
    marginLeft: "15%",
  },
};

export default Carousel;
