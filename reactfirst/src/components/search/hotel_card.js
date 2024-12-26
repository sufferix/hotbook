import React from "react";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

const formatAmenities = (amenities) => {
  if (!amenities || amenities.length === 0) return "";
  return amenities.join(",");
};

const HotelCard = ({ hotel, city, checkInDate, checkOutDate, amenities, numOfAdults, numOfChildren }) => {
  const getRatingColor = (rating) => {
    if (!rating) return "#ccc"; 
    if (rating >= 4) return "#39e07b";
    if (rating >= 3) return "#ffdd57";
    return "#ff6f61";
  };

  const handleLinkClick = () => {
  };

  const hotelImage = hotel.photos?.length > 0 ? hotel.photos[0] : null;

  return (
    <Link
      to={{
        pathname: `/hotels/${hotel.id}`,
        search: `?city=${encodeURIComponent(city)}&checkInDate=${formatDate(checkInDate)}&checkOutDate=${formatDate(checkOutDate)}&amenities=${formatAmenities(amenities)}&numOfAdults=${numOfAdults}&numOfChildren=${numOfChildren}`,
        state: { numOfAdults, numOfChildren }, 
      }}
      className="hotel-card-link"
      onClick={handleLinkClick}
    >
      <div className="hotel-card">
        <div className="hotel-image">
          {hotelImage ? <img src={hotelImage} alt={hotel.name} /> : <div className="placeholder">Нет фото</div>}
        </div>
        <div className="hotel-content">
          <h3 className="hotel-name">{hotel.name}</h3>
          <div className="hotel-tags">
            {hotel.tags?.map((tag, index) => (
              <span key={index} className="hotel-tag">{tag}</span>
            ))}
          </div>
          <div className="hotel-rating">
            <span className="hotel-stars">{Array(hotel.stars).fill("★").join("")}</span>
            <span className="rating-value" style={{ backgroundColor: getRatingColor(hotel.averageRating) }}>
              {hotel.averageRating || "N/A"}
            </span>
          </div>
        </div>
        <div className="hotel-price">
          <div className="total-price">{hotel.priceForPeriod} ₽</div>
          <div className="price-per-night">{hotel.pricePerNight} ₽ за ночь</div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
