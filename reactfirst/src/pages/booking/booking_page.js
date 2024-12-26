import React, { useEffect, useState } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, resetCreateStatus } from "../../redux/slices/bookingSlice";
import BookingInfo from "../../components/booking/booking_info";
import BookingForm from "../../components/booking/booking_form";
import SubmitModal from "../../components/booking/submit_modal";
import "./booking_page.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { createStatus, error } = useSelector((state) => state.bookings);

  const {
    hotelId,
    roomId,
    hotelName,
    roomName,
    checkInDate,
    checkOutDate,
    numOfAdults = 0,
    numOfChildren = 0,
    totalCost,
  } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(resetCreateStatus());
  }, [dispatch]);

  const handleBookingSubmit = async () => {
    if (!token) {
      alert("Вы должны быть авторизованы для бронирования.");
      return;
    }

    if (!formData) {
      alert("Форма не заполнена!");
      return;
    }

    dispatch(resetCreateStatus());

    const { fullName } = formData;
    const payloadForBackend = {
      checkInDate,
      checkOutDate,
      numOfAdults,
      numOfChildren,
      fullName,
    };

    try {
      const resultAction = await dispatch(
        createBooking({
          hotelId,
          roomId,
          payload: payloadForBackend,
        })
      );

      if (createBooking.fulfilled.match(resultAction)) {
        navigate("/booking-success", {
          state: {
            bookingDetails: {
              hotelName,
              roomName,
              checkInDate,
              checkOutDate,
              numOfAdults,
              numOfChildren,
              photos: location.state.photos || [],
              fullName,
            },
            paymentInfo: {
              fullName,
              price: totalCost || 0,
            },
          },
        });
      } else {
        alert("Ошибка при создании бронирования: " + (error || ""));
      }
    } catch (err) {
      console.error("Произошла ошибка при бронировании:", err);
      alert("Произошла ошибка при бронировании");
    }
  };

  return (
    <div className="booking-page">
      <h1 className="page-title">Бронирование номера</h1>

      <section className="booking-info">
        <BookingInfo
          hotelName={hotelName || "—"}
          roomCategory={roomName || "—"}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adults={numOfAdults}
          children={numOfChildren}
          photos={location.state.photos || []}
        />
      </section>
      <h2>Информация об оплате</h2>
      <section className="booking-payment">
        <BookingForm
          onSubmit={(data) => {
            setFormData(data);
            setIsModalOpen(true);
          }}
          totalCost={totalCost || 0}
        />
      </section>

      <SubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={{
          checkInDate,
          checkOutDate,
          numOfAdults,
          numOfChildren,
        }}
        clientInfo={{
          hotelName,
          roomName,
        }}
        totalAmount={totalCost || 0}
        onConfirm={handleBookingSubmit}
      />

      {createStatus === "loading" && <p>Создаём бронь...</p>}
      {createStatus === "failed" && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BookingPage;
