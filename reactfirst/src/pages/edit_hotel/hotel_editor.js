import React, { useState } from "react";
import "./hotel_editor.css"

// Удобства для выбора
const amenitiesList = ["Wi-Fi", "Кондиционер", "Парковка", "Можно с животными"];

const HotelEditor = () => {
  const [hotelName, setHotelName] = useState("Название отеля");
  const [description, setDescription] = useState(
    "Этот отель замечательно подходит для отдыха: голубой дом с белыми ставнями и видом на реку"
  );
  const [amenities, setAmenities] = useState(["Wi-Fi", "Парковка"]);
  const [rooms, setRooms] = useState([
    { id: 1, category: "Тяжелый люкс", price: "300 $" },
    { id: 2, category: "Тяжелый люкс", price: "300 $" },
  ]);

  const handleAddRoom = () => {
    setRooms([...rooms, { id: rooms.length + 1, category: "", price: "" }]);
  };

  const handleEditRoom = (id, updatedRoom) => {
    setRooms(rooms.map((room) => (room.id === id ? updatedRoom : room)));
  };

  const handleDeleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const toggleAmenity = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  return (
    <div className="hotel-editor">
      {/* Название отеля */}
      <h1>
        <input
          type="text"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          className="editable-input"
        />
      </h1>

      {/* Описание */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="editable-textarea"
      />

      {/* Удобства */}
      <div className="amenities-section">
        <h3>Удобства:</h3>
        {amenitiesList.map((amenity) => (
          <button
            key={amenity}
            onClick={() => toggleAmenity(amenity)}
            className={amenities.includes(amenity) ? "selected" : ""}
          >
            {amenity}
          </button>
        ))}
      </div>

      {/* Список номеров */}
      <div className="rooms-section">
        <h3>Номера:</h3>
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <input
              type="text"
              value={room.category}
              placeholder="Категория номера"
              onChange={(e) =>
                handleEditRoom(room.id, {
                  ...room,
                  category: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={room.price}
              placeholder="Цена за ночь"
              onChange={(e) =>
                handleEditRoom(room.id, { ...room, price: e.target.value })
              }
            />
            <button onClick={() => handleDeleteRoom(room.id)}>Удалить</button>
          </div>
        ))}
        <button onClick={handleAddRoom}>Добавить номер</button>
      </div>
    </div>
  );
};

export default HotelEditor;
