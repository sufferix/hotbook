import React from "react";

const BookingInfo = ({
  hotelName,
  roomCategory,
  checkInDate,
  checkOutDate,
  adults = 1,
  children = 0,
  photos = [],
}) => {
  const imageUrl = photos.length > 0 ? photos[0].url : null;

  return (
    <div className="booking-card">
      <div className="hotel-image-placeholder">
        {imageUrl ? (
          <img src={imageUrl} alt={`Фото отеля ${hotelName}`} className="room-image" />
        ) : (
          <span>Нет фото</span>
        )}
      </div>

      <div className="booking-details">
        <h3 className="hotel-name">{hotelName}</h3>
        <p className="room-category">Категория номера: {roomCategory}</p>
      </div>

      <div className="booking-meta">
        <div className="date-info">
          Даты проживания: {checkInDate} - {checkOutDate}
        </div>
        <div className="guests-info">
          {adults} взрослых, {children} детей
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
