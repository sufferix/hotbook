import React from "react";

function AmenitiesSection() {
  const amenities = ["WiFi", "Кондиционер", "Парковка", "Можно с животными"];

  return (
    <div className="amenities-section">
      <h3 className="section-title">Удобства</h3>
      <ul className="amenities-list">
        {amenities.map((amenity, index) => (
          <li key={index} className="amenity-item">
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AmenitiesSection;
