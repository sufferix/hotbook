import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAmenities } from "../../redux/slices/amenitiesSlice";
import "./filter_modal.css";

const FilterModal = ({ isOpen, onClose, filters, setFilters }) => {
  const dispatch = useDispatch();
  const { list: amenities, status, error } = useSelector((state) => state.amenities);

  const stars = [5, 4, 3, 2, 1];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAmenities());
    }
  }, [status, dispatch]);

  const toggleFilter = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type]?.includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...(prevFilters[type] || []), value],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Фильтры</h2>

        <div className="filter-section">
          <h3>Количество звезд</h3>
          {stars.map((star) => (
            <button
              key={star}
              onClick={() => toggleFilter("stars", star)}
              className={`filter-button ${
                filters.stars?.includes(star) ? "active" : ""
              }`}
            >
              {"★".repeat(star)}
            </button>
          ))}
        </div>

        <div className="filter-section">
          <h3>Удобства номера</h3>
          {status === "loading" && <p>Загрузка удобств...</p>}
          {status === "failed" && <p className="error-message">{error}</p>}
          {status === "succeeded" &&
            amenities.map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => toggleFilter("amenities", amenity.id)}
                className={`filter-button ${
                  filters.amenities?.includes(amenity.id) ? "active" : ""
                }`}
              >
                {amenity.name}
              </button>
            ))}
        </div>

        <button className="apply-button" onClick={onClose}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
