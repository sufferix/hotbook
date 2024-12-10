import React from "react";
import { useNavigate } from "react-router-dom";

function NoBooking() {
  const navigate = useNavigate();

  return (
    <div className="no-booking">
      <p>Ой, у вас ещё нет бронирования! Пора наверстать упущенное!</p>
      <button className="book-now-button" onClick={() => navigate("/")}>
        Перейти к бронированию
      </button>
    </div>
  );
}

export default NoBooking;
