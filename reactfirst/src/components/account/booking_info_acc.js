import React from "react";

function BookingInfo({
  hotelName,
  roomType,
  checkInDate,
  checkOutDate,
  adults,
  children,
  imageUrl,
  surname,
  price,
  onCancel,
}) {
  return (
    <div className="booking-card">
      <div className="hotel-image-placeholder">
        {imageUrl ? (
          <img src={imageUrl} alt={`${hotelName}`} />
        ) : (
          <span>Нет фото</span>
        )}
      </div>
      <div className="booking-details">
        <h3 className="hotel-name">{hotelName}</h3>
        <p className="room-category">Категория номера: {roomType}</p>
        <p className="client-name">Бронировал: {surname}</p>
      </div>
      <div className="booking-meta">
        <div className="date-info">{checkInDate} - {checkOutDate}</div>
        <div className="guests-info">{adults} взрослых, {children} детей</div>
      </div>
      <div className="booking-price">
        <p className="price">{price} ₽</p>
        <button className="cancel-button" onClick={onCancel}>
          Отменить бронирование
        </button>
      </div>
    </div>
  );
}

export default BookingInfo;
