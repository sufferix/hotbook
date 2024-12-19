import React, { useState, useRef } from "react";

const GuestCounter = ({ guests, setGuests }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const dropdownRef = useRef(null);

  // Открытие/закрытие выпадающего окна
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Обработчики изменения количества
  const incrementAdults = () => {
    setAdults((prev) => prev + 1);
    setGuests(adults + 1 + children);
  };

  const decrementAdults = () => {
    if (adults > 0) {
      setAdults((prev) => prev - 1);
      setGuests(adults - 1 + children);
    }
  };

  const incrementChildren = () => {
    setChildren((prev) => prev + 1);
    setGuests(adults + children + 1);
  };

  const decrementChildren = () => {
    if (children > 0) {
      setChildren((prev) => prev - 1);
      setGuests(adults + children - 1);
    }
  };

  return (
    <div className="guest-counter-container" ref={dropdownRef}>
      <label className="guest-counter-label">Количество гостей</label>
      {/* Поле для выбора количества гостей */}
      <div className="guest-input" onClick={toggleDropdown}>
        <span>{adults} взрослых, {children} детей</span>
      </div>

      {/* Выпадающее окно */}
      {isDropdownOpen && (
        <div className="guest-dropdown">
          <div className="counter">
            <span>Взрослые</span>
            <div className="buttons">
              <button onClick={decrementAdults} disabled={adults === 0}>-</button>
              <span>{adults}</span>
              <button onClick={incrementAdults}>+</button>
            </div>
          </div>
          <div className="counter">
            <span>Дети</span>
            <div className="buttons">
              <button onClick={decrementChildren} disabled={children === 0}>-</button>
              <span>{children}</span>
              <button onClick={incrementChildren}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCounter;


