// pages/BookingSuccess.js
import React from "react";
import { useLocation } from "react-router-dom";
import BookingInfo from "../../components/booking/booking_info";
import PaymentCard from "../../components/booking/payment_card";
import NavigationButtons from "../../components/booking/nav_btns";

const BookingSuccess = () => {
  const location = useLocation();

  // Данные бронирования
  const { bookingDetails } = location.state || {
    bookingDetails: {
      hotelName: "Название отеля",
      category: "Тяжелый люкс",
      checkIn: "20 окт.",
      checkOut: "25 окт.",
      guests: "2 взрослых",
      clientName: "Фамилия Имя Отчество",
      email: "pochta@example.com",
      price: "18 000 ₽",
    },
  };

  return (
    <div className="booking-success">
      <h1 className="success-title">Номер успешно забронирован!</h1>
      <BookingInfo
        hotelName={bookingDetails.hotelName}
        category={bookingDetails.category}
        checkIn={bookingDetails.checkIn}
        checkOut={bookingDetails.checkOut}
        guests={bookingDetails.guests}
      />
      <PaymentCard
        clientName={bookingDetails.clientName}
        email={bookingDetails.email}
        price={bookingDetails.price}
      />
      <NavigationButtons />
    </div>
  );
};

export default BookingSuccess;

