import React, { useState } from "react";

const BookingForm = ({ onSubmit, totalCost }) => {
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    middleName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = [
      formData.surname.trim(),
      formData.name.trim(),
      formData.middleName.trim(),
    ]
      .filter(Boolean)
      .join(" ");

    onSubmit({
      fullName,
    });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          name="surname"
          placeholder="Фамилия"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="middleName"
          placeholder="Отчество (не обязательно)"
          value={formData.middleName}
          onChange={handleChange}
        />
      </div>

      <div className="payment-summary">
        <div className="total-amount-text">Итого к оплате:</div>
        <div className="amount">{totalCost} ₽</div>
      </div>

      <button type="submit" className="book-button">
        Забронировать
      </button>
    </form>
  );
};

export default BookingForm;
