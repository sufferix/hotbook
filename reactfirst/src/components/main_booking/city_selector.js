import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../redux/slices/citySlice";
function CitySelector({ city, setCity }) {
  const dispatch = useDispatch();
  const { list: cities, status, error } = useSelector((state) => state.city);
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCities());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && !cities.includes(city)) {
      setCity("");
    }
  }, [cities, city, status, setCity]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const selectCity = (selectedCity) => {
    setCity(selectedCity);
    setDropdownOpen(false);
  };

  return (
    <div className="city-input-container" ref={dropdownRef}>
      <label className="booking-label">Направление</label>
      <input
        type="text"
        className="city-input"
        placeholder="Выберите город"
        value={city}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && status === "succeeded" && (
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
      {status === "loading" && <p className="loading-message">Загрузка городов...</p>}
      {status === "failed" && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CitySelector;
