import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingInfo from "../../components/booking/booking_info";
import "./booking_success.css";

const PaymentInfoCard = ({ paymentInfo }) => {
  return (
    <div className="payment-info-card">
      <p>
        <strong>{paymentInfo.fullName}</strong>
      </p>
      <p>Оплата: наличными/картой при заселении</p>
      <p className="total-price">
        <strong>{paymentInfo.price} ₽</strong>
      </p>
    </div>
  );
};

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingDetails, paymentInfo } = location.state || {};

  if (!bookingDetails || !paymentInfo) {
    return (
      <div className="error-message">
        <h1>Ошибка</h1>
        <p>Информация о бронировании отсутствует.</p>
        <button onClick={() => navigate("/")} className="nav-button">
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="success-booking-page">
      <h1>Номер успешно забронирован!</h1>

      <h2>Информация о номере</h2>
      <BookingInfo
        hotelName={bookingDetails.hotelName}
        roomCategory={bookingDetails.roomName}
        checkInDate={bookingDetails.checkInDate}
        checkOutDate={bookingDetails.checkOutDate}
        adults={bookingDetails.numOfAdults}
        children={bookingDetails.numOfChildren}
        photos={bookingDetails.photos || []} 
      />

      <h2>Информация об оплате</h2>
      <PaymentInfoCard paymentInfo={paymentInfo} />

      <div className="navigation-buttons">
        <button onClick={() => navigate("/")} className="nav-button">
          На главную
        </button>
        <button
          onClick={() => navigate("/client-dashboard")}
          className="nav-button"
        >
          В личный кабинет
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
