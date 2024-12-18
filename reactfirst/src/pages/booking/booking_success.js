import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingInfo from "../../components/booking/booking_info"; // компонент с прошлой страницы
import "./booking_success.css";

const PaymentInfoCard = ({ paymentInfo }) => {
  return (
    <div className="payment-info-card">
      <p>
        <strong>{paymentInfo.fullName}</strong>
      </p>
      <p>{paymentInfo.email}</p>
      <p>наличными при заселении</p>
      <p className="total-price">
        <strong>{paymentInfo.price} ₽</strong>
      </p>
    </div>
  );
};

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Получаем данные из состояния или используем тестовые данные
  const {
    bookingDetails = {
      hotelName: "Название отеля",
      roomCategory: "Тяжелый люкс",
      checkIn: "20 окт.",
      checkOut: "25 окт.",
      guests: "2 взрослых",
      price: 18000,
    },
    paymentInfo = {
      fullName: "Фамилия Имя Отчество",
      email: "pochta@example.com",
      price: 18000,
    },
  } = location.state || {};

  return (
    <div className="success-booking-page">
      <h1>Номер успешно забронирован!</h1>

      <h2>Информация о номере</h2>
      <BookingInfo bookingDetails={bookingDetails} />

      <h2>Информация об оплате</h2>
      <PaymentInfoCard paymentInfo={paymentInfo} />

      <div className="navigation-buttons">
        <button onClick={() => navigate("/")} className="nav-button">
          На главную
        </button>
        <button
          onClick={() => navigate("/dashboard/client")}
          className="nav-button"
        >
          В личный кабинет
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;


