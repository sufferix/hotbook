// components/PaymentCard.js
import React from "react";

const PaymentCard = ({ clientName, email, price }) => {
  return (
    <section className="payment-card">
      <h3>Информация об оплате</h3>
      <div className="payment-details">
        <div>
          <p>{clientName}</p>
          <p>{email}</p>
          <p>наличными при заселении</p>
        </div>
        <div className="total-price">
          <h2>{price}</h2>
        </div>
      </div>
    </section>
  );
};

export default PaymentCard;
