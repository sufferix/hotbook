import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageSlider() {
  const images = [
    "/images/hotel1.jpg",
    "/images/hotel2.jpg",
    "/images/hotel3.jpg",
    "/images/hotel4.jpg",
  ]; // Замените на реальные пути к изображениям

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Отель ${index + 1}`} className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
