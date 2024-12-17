import React from "react";
import { useNavigate } from "react-router-dom";

function RoomCards() {
  const rooms = [
    { category: "Тяжелый люкс", price: 300, image: "/images/room1.jpg" },
    { category: "Тяжелый люкс", price: 300, image: "/images/room2.jpg" },
    { category: "Тяжелый люкс", price: 300, image: "/images/room3.jpg" },
    { category: "Тяжелый люкс", price: 300, image: "/images/room4.jpg" },
  ];

  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking"); // Переход на страницу бронирования
  };

  return (
    <div className="room-cards-container">
      <h3 className="section-title">Забронировать номер</h3>
      <div className="room-cards">
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <img src={room.image} alt={room.category} className="room-image" />
            <p className="room-category">{room.category}</p>
            <p className="room-price">{room.price} $/ночь</p>
            <button className="book-button" onClick={handleBookingClick}>Забронировать номер</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomCards;
