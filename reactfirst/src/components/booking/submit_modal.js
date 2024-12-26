import React from "react";

const SubmitModal = ({
  isOpen,
  onClose,
  bookingData,
  clientInfo,
  totalAmount,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleConfirmBooking = () => {
    onConfirm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Подтверждение бронирования</h2>
        <p>Вы уверены в правильности введённых данных?</p>
        <button className="confirm-button" onClick={handleConfirmBooking}>
          Да, всё верно
        </button>
        <button className="button-no" onClick={onClose}>
          Нет, проверю ещё раз
        </button>
      </div>
    </div>
  );
};

export default SubmitModal;
