import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import "./image_slider.css";
function ImageSlider({ images = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowLeft className="arrows" style={{ color: "white" }} />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowRight className="arrows" style={{ color: "white" }} />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    className: "slides",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="image-slider">
      {images.length > 0 ? (
        <>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div
                key={index}
                className="slide"
                onClick={() => openModal(image)}
              >
                <img
                  src={image}
                  alt={`Фото отеля ${index + 1}`}
                  className="slide-image"
                />
              </div>
            ))}
          </Slider>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="fullscreen-modal"
            overlayClassName="fullscreen-overlay"
            ariaHideApp={false}
          >
            {selectedImage && (
              <div>
                <AiOutlineClose className="fullscreen-close-icon" onClick={closeModal} />
                <img src={selectedImage} alt="Полноэкранное фото" className="fullscreen-image" />
              </div>
            )}
          </Modal>
        </>
      ) : (
        <div className="placeholder-slider">Нет доступных изображений</div>
      )}
    </div>
  );
}

export default ImageSlider;
