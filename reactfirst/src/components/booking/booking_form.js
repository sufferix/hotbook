import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = ({ onSubmit, totalAmount }) => {
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    middleName: "",
    email: "",
    paymentMethod: "cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const navigate = useNavigate();

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {/* Поля ввода */}
      <div className="input-row">
        <input
          type="text"
          name="surname"
          placeholder="Фамилия"
          value={formData.surname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="middleName"
          placeholder="Отчество"
          value={formData.middleName}
          onChange={handleChange}
        />
      </div>
      <div className="input-row">
        <input
          type="email"
          name="email"
          placeholder="Почта"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {/* Радиокнопка */}
      {/* Радиокнопка и стоимость в одном контейнере */}
      <div className="payment-options">
        <div className="payment-method">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === "cash"}
              onChange={handleChange}
            />
            наличными при заселении
          </label>
        </div>
        <div class="payment-summary-inline">
          <div class="total-amount-text">Итого к оплате:</div>
          <div class="amount">{totalAmount} ₽</div>
        </div>
      </div>

      <button type="submit" onClick={() => navigate("/success")} className="book-button" >
        Забронировать
      </button>
    </form>
  );
};

export default BookingForm;





