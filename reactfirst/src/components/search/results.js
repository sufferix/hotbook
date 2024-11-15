import React from "react";
import HotelCard from "./hotel_card";

const ResultsContainer = ({ hotels, activeFilters, onHotelClick }) => (
  <div className="results-container">
    {hotels.map((hotel) => (
      <HotelCard
        key={hotel.id}
        hotel={hotel}
        activeFilters={activeFilters}
        onClick={() => onHotelClick(hotel.id)}
      />
    ))}
  </div>
);

export default ResultsContainer;
