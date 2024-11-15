import React from "react";

function GuestCounter({ guests, setGuests }) {
  const increaseGuests = () => setGuests(guests + 1);
  const decreaseGuests = () => setGuests(guests > 1 ? guests - 1 : 1);

  return (
    <div className="guest-counter-container">
      <label className="booking-label">Кол-во отдыхающих</label>
      <div className="guest-counter">
        <span>{guests} взрослых</span>
        <button onClick={increaseGuests} className="guest-button">+</button>
        <button onClick={decreaseGuests} className="guest-button">-</button>
      </div>
    </div>
  );
}

export default GuestCounter;
