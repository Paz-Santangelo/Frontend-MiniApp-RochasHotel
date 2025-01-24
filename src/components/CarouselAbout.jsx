import Carousel from "react-bootstrap/Carousel";

const CarouselAbout = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          src="https://www.casonasasturianas.com/wp-content/uploads/casonas-asturianas-hotel-3-cabos-02.jpg"
          alt=""
          style={styles.imageCarousel}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://www.casonasasturianas.com/wp-content/uploads/casonas-asturianas-hotel-3-cabos-24.jpg"
          alt=""
          style={styles.imageCarousel}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://www.circuitogastronomico.com/wp-content/uploads/2022/07/Portal-del-lago-212.jpg"
          alt=""
          style={styles.imageCarousel}
        />
      </Carousel.Item>
    </Carousel>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  imageCarousel: {
    maxWidth: "60%",
    height: "auto",
    margin: "0 auto",
    borderRadius: "10px",
    display: "block",
  },
};

export default CarouselAbout;
