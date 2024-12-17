import React from "react";

function BookingInfo() {
  return (
    <div className="booking-card">
      <div className="hotel-image-placeholder"></div>
      <div className="booking-details">
        <h3 className="hotel-name">Название отеля</h3>
        <p className="room-category">Категория номера: Тяжелый люкс</p>
      </div>
      <div className="booking-meta">
        <div className="date-info">
          <span>📅</span> 20 окт. - 25 окт.
        </div>
        <div className="guests-info">
          <span>👥</span> 2 взрослых
        </div>
      </div>
    </div>
  );
}

export default BookingInfo;