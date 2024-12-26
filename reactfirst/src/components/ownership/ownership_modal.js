import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendApplication } from "../../redux/slices/ownershipSlice";
import "./ownership_modal.css";

const OwnershipApplicationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    hotelName: "",
  });

  const dispatch = useDispatch();
  const { status, error, message } = useSelector((state) => state.ownership);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sendApplication(formData));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Анкета владельца отеля</h2>
        {status === "succeeded" && <p className="success-message">{message}</p>}
        {status === "failed" && <p className="error-message">{error}</p>}
        {status !== "succeeded" && (
          <form onSubmit={handleSubmit} className="application-form">
            <input
              type="text"
              name="fullName"
              placeholder="ФИО"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Телефон"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Город"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Адрес"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="hotelName"
              placeholder="Название отеля"
              value={formData.hotelName}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="submit-button"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Отправка..." : "Отправить"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OwnershipApplicationModal;
