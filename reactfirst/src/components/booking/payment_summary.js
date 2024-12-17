import React from "react";

const PaymentSummary = ({ totalPrice, onSubmit }) => {
  return (
    <div className="payment-summary">
      <div className="total-amount">
        Итого к оплате: <span>{totalPrice} ₽</span>
      </div>
      <button className="book-button" onClick={onSubmit}>
        Забронировать
      </button>
    </div>
  );
};

export default PaymentSummary;
