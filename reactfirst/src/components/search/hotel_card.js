import React from "react";

const HotelCard = ({ hotel }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4) return "#39e07b"; // Зеленый для высоких оценок
    if (rating >= 3) return "#ffdd57"; // Желтый для средних оценок
    return "#ff6f61"; // Красный для низких оценок
  };

  return (
    <div className="hotel-card">
      {/* Заполнитель для фото */}
      <div className="hotel-image">
        {hotel?.image ? (
          <img src={hotel.image} alt={hotel.name || "Отель"} />
        ) : (
          <div className="placeholder-image">Фото</div>
        )}
      </div>

      {/* Метаданные отеля */}
      <div className="hotel-info">
        <h3 className="hotel-name">{hotel?.name || "Неизвестный отель"}</h3>
        <div className="hotel-tags">
          {hotel?.tags?.map((tag, index) => (
            <span key={index} className="hotel-tag">{tag}</span>
          ))}
        </div>
        <div className="hotel-details">
          <div className="hotel-rating">
            <span className="rating-label">Рейтинг:</span>
            <span
              className="rating-value"
              style={{ backgroundColor: getRatingColor(hotel?.rating || 0) }}
            >
              {hotel?.rating || "N/A"}
            </span>
          </div>
          <div className="hotel-stars">
            {Array(hotel?.stars || 0).fill("★").map((star, index) => (
              <span key={index} className="star">{star}</span>
            ))} {hotel?.stars || 0} звезды
          </div>
        </div>
      </div>

      {/* Цены */}
      <div className="hotel-price">
        <div className="total-price">{hotel?.totalPrice?.toLocaleString() || 0} ₽</div>
        <div className="price-per-night">{hotel?.pricePerNight?.toLocaleString() || 0} ₽ за ночь</div>
      </div>
    </div>
  );
};

export default HotelCard;
