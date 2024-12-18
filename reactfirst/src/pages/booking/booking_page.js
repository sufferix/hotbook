import React from "react";
import BookingInfo from "../../components/booking/booking_info"; // Импорт компонента карточки отеля
import BookingForm from "../../components/booking/booking_form";
import "./booking_page.css";

const BookingPage = () => {
  const handleBookingSubmit = (data) => {
    console.log("Данные для бронирования:", data);
    alert("Бронирование успешно оформлено!");
  };

  return (
    <div className="booking-page">
      <h1 className="page-title">Бронирование номера</h1>

      {/* Блок информации о номере */}
      <section className="booking-info">
        <h2>Информация о номере</h2>
        <BookingInfo />
      </section>

      {/* Блок информации об оплате */}
      <section className="booking-payment">
        <h2>Информация об оплате</h2>
        <BookingForm onSubmit={handleBookingSubmit} />
      </section>
    </div>
  );
};

export default BookingPage;

