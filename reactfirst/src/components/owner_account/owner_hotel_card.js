import React from "react";

const OwnerHotelCard = ({ hotel, onEdit, onDelete }) => {

  const getRatingColor = (rating) => {
    if (!rating) return "#ccc";
    if (rating >= 4) return "#39e07b";
    if (rating >= 3) return "#ffdd57";
    return "#ff6f61";
  };


  const hotelImage = hotel.photos?.length > 0 ? hotel.photos[0] : null;

  return (
    <div className="hotel-card">
      <div className="hotel-image">
        {hotelImage ? (
          <img src={hotelImage} alt={hotel.name} />
        ) : (
          <div className="placeholder">Нет фото</div>
        )}
      </div>

      <div className="hotel-content">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-address">{hotel.address}</p>
        <div className="hotel-rating">
          <span className="hotel-stars">
            {Array(hotel.stars).fill("★").join("")}
          </span>
          <span
            className="rating-value"
            style={{ backgroundColor: getRatingColor(hotel.averageRating) }}
          >
            {hotel.averageRating || "N/A"}
          </span>
        </div>
      </div>

      <div className="hotel-actions">
        <button
          className="edit-button"
          onClick={onEdit}
        >
          Изменить
        </button>
        <button
          className="delete-button"
          onClick={onDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default OwnerHotelCard;
