import React, { useState } from "react";
import "./ownership_modal.css";

const OwnershipApplicationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hotelName: "",
    city: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Анкета отправлена:", formData);
    // Здесь можно добавить отправку данных на сервер
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Хочю.</h2>
        <p>Чтобы стать владельцем, необходимо заполнить анкету и отправить её на модерацию.</p>
        <form onSubmit={handleSubmit} className="application-form">
          <input
            type="text"
            name="name"
            placeholder="ФИО"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Почта"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="hotelName"
            placeholder="Название отеля"
            value={formData.hotelName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Город"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Адрес"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-button">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnershipApplicationModal;
