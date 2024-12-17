import React, { useState } from "react";
import BookingInfo from "../../components/booking/booking_info";
import PaymentForm from "../../components/booking/payment_form";
import PaymentSummary from "../../components/booking/payment_summary";
import "./booking_page.css";

const BookingPage = () => {
  const [clientData, setClientData] = useState({});
  const totalPrice = 18000; // Сумма к оплате

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = () => {
    console.log("Данные клиента:", clientData);
    alert("Бронирование успешно!");
  };

  return (
    <div className="booking-page">
      <h1>Бронирование номера</h1>
      <section className="hotel-info-section">
        <BookingInfo
          hotelName="Название отеля"
          roomCategory="Категория номера: Тяжелый люкс"
          checkIn="20 окт."
          checkOut="25 окт."
          guests="2"
        />
      </section>

      <h2>Информация об оплате</h2>
      <section className="payment-section">
        <PaymentForm onInputChange={handleInputChange} />
      </section>
    </div>
  );
};

export default BookingPage;
