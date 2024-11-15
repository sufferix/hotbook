import React, { useState } from "react";

function CitySelector({ city, setCity }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const cities = [
    "Санкт-Петербург, Россия",
    "Москва, Россия",
    "Сочи, Россия",
    "Казань, Россия",
    "Новосибирск, Россия"
  ];

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const selectCity = (selectedCity) => {
    setCity(selectedCity);
    setDropdownOpen(false);
  };

  return (
    <div className="city-input-container">
      <label className="booking-label">Направление</label>
      <input
        type="text"
        className="city-input"
        placeholder="Санкт-Петербург, Россия"
        value={city}
        onClick={toggleDropdown}
        readOnly
      />
      {isDropdownOpen && (
        <div className="city-dropdown">
          {cities.map((cityItem, index) => (
            <div
              key={index}
              className="city-dropdown-item"
              onClick={() => selectCity(cityItem)}
            >
              {cityItem}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CitySelector;
