import React, { useState, useEffect } from "react";
import SearchForm from "../../components/search/search_form";
import Filters from "../../components/search/filters";
import HotelCard from "../../components/search/hotel_card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./hotel_search.css";

const HotelSearchPage = () => {
  const [city, setCity] = useState("Санкт-Петербург");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [filters, setFilters] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, [filters, city, startDate, endDate, guests]);

  /*const fetchHotels = async () => {
    try {
      const response = await fetch("/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, startDate, endDate, guests, filters }),
      });
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Ошибка загрузки отелей", error);
    }
  };*/
  const fetchHotels = async () => {
    // Тестовые данные
    const data = [
      {
        id: 1,
        name: "Гранд Отель",
        image: null,
      },
      {
        id: 2,
        name: "Бюджетный Отель",
        image: null,
      },
    ];
    console.log("Тестовые данные:", data); // Лог для проверки
    setHotels(data);
  };

  const handleFilterClick = (filter) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <div className="hotel-search-page">
    <div className="map-container">
      <MapContainer center={[55.751244, 37.618423]} zoom={10} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

        {/* Правая часть с формой и результатами */}
        <div className="search-section">
          <SearchForm
            city={city}
            setCity={setCity}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            guests={guests}
            setGuests={setGuests}
          />

          <Filters filters={filters} handleFilterClick={handleFilterClick} />

          <HotelCard hotels={hotels} />
        </div>
      </div>
    </div>
  );
};

export default HotelSearchPage;
