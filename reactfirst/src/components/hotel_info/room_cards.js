// src/components/hotel_info/room_cards.js
import React, { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import "./room_cards.css";

function RoomCards({
  rooms,
  hotelId,
  hotelName,
  checkInDate,
  checkOutDate,
  numOfAdults,
  numOfChildren,
}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const RoomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`room-slider-arrow room-slider-prev ${className}`}>
        <AiOutlineArrowLeft />
      </div>
    );
  };

  const RoomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`room-slider-arrow room-slider-next ${className}`}>
        <AiOutlineArrowRight />
      </div>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: rooms.photos?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    className: "slides",
    nextArrow: <RoomNextArrow />,
    prevArrow: <RoomPrevArrow />,
  };

  const handleBookingClick = (room) => {
    if (!checkInDate || !checkOutDate) {
      alert("Не выбраны даты заезда и выезда!");
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    if (numberOfNights <= 0) {
      alert("Некорректные даты бронирования!");
      return;
    }
    const totalCost = room.roomPrice * numberOfNights;

    navigate("/booking", {
      state: {
        hotelId,
        roomId: room.id,
        hotelName,
        roomName: room.roomType,
        checkInDate,
        checkOutDate,
        numOfAdults,
        numOfChildren,
        totalCost,
        photos: room.photos || [],
      },
    });
  };

  const handlePhotoClick = (url) => {
    setSelectedPhoto(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  if (!rooms || rooms.length === 0) {
    return (
      <div className="room-cards-container">
        <h3 className="section-title">Забронировать номер</h3>
        <p>Нет доступных номеров</p>
      </div>
    );
  }

  return (
    <div className="room-cards-container">
      <h3 className="section-title">Забронировать номер</h3>
      <div className="room-cards">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            {room.photos && room.photos.length > 0 ? (
              <Slider {...sliderSettings} className="room-slider">
                {room.photos.map((photoObj, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={photoObj.url}
                    alt={`Фото номера ${imgIndex + 1}`}
                    className="room-image"
                    onClick={() => handlePhotoClick(photoObj.url)}
                  />
                ))}
              </Slider>
            ) : (
              <div className="room-placeholder"></div>
            )}

            <p className="room-category">{room.roomType}</p>
            <p className="room-price">{room.roomPrice} ₽/ночь</p>

            <button className="book-button" onClick={() => handleBookingClick(room)}>
              Забронировать номер
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fullscreen-overlay" onClick={closeModal}>
          <img src={selectedPhoto} alt="Полноразмерное фото" className="fullscreen-image" />
          <AiOutlineClose className="close-icon" onClick={closeModal} />
        </div>
      )}
    </div>
  );
}

export default RoomCards;
