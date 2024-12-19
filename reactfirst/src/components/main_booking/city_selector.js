import React, { useState, useEffect } from "react";
import axios from "axios";

function CitySelector({ city, setCity }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/hotels/cities");
        setCities(response.data.cities || []);
      } catch (error) {
        setErrorMessage("Ошибка загрузки городов");
      }
    };

    fetchCities();
  }, []);

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
        placeholder="Выберите город"
        value={city}
        onClick={toggleDropdown}
        readOnly={false}
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CitySelector;

