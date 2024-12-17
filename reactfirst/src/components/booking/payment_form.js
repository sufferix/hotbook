import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ price }) => {
  // Локальное состояние для данных формы
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    patronymic: "",
    email: "",
    paymentMethod: "cash",
  });

  // Обработчик изменения данных формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Данные формы:", formData);
    console.log("Сумма к оплате:", price);
    alert("Бронирование успешно оформлено!");
  };

  const navigate = useNavigate();

  return (
    <form className="payment-card" onSubmit={handleSubmit}>
      {/* Поля ввода */}
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="surname">Фамилия</label>
          <input
            id="surname"
            name="surname"
            type="text"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="patronymic">Отчество</label>
          <input
            id="patronymic"
            name="patronymic"
            type="text"
            value={formData.patronymic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Почта</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Радиокнопка и итоговая стоимость */}
      <div className="additional-row">
        <div className="radio-group">
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={formData.paymentMethod === "cash"}
            onChange={handleChange}
          />
          <label htmlFor="cash">Наличными при заселении</label>
        </div>

        <div className="total-payment">
          <p>Итого к оплате:</p>
          <h2>{price} ₽</h2>
        </div>
      </div>

      {/* Кнопка отправки */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button type="submit" className="btn-book" onClick={() => navigate("/success")}>
          Забронировать
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;




