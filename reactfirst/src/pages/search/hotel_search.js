import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredHotels, clearHotels } from "../../redux/slices/hotelSlice";

import SearchForm from "../../components/search/search_form";
import HotelCard from "../../components/search/hotel_card";
import FilterModal from "../../components/search/filter_modal";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./hotel_search.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const HotelSearchPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { list: hotels, status, error } = useSelector((state) => state.hotels);

  const initialParams = useMemo(() => location.state || {}, [location.state]);

  const [city, setCity] = useState(initialParams.city || "");
  const [checkInDate, setCheckInDate] = useState(
    initialParams.checkInDate ? new Date(initialParams.checkInDate) : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialParams.checkOutDate ? new Date(initialParams.checkOutDate) : null
  );
  const [numOfAdults, setNumOfAdults] = useState(initialParams.numOfAdults || 1);
  const [numOfChildren, setNumOfChildren] = useState(initialParams.numOfChildren || 0);
  const [filters, setFilters] = useState({ stars: [], amenities: [] });
  const [pendingFilters, setPendingFilters] = useState({ stars: [], amenities: [] });
  const [mapCenter, setMapCenter] = useState([59.938676, 30.314494]);
  const [hotelsWithCoords, setHotelsWithCoords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  }, [city, checkInDate, checkOutDate, numOfAdults, numOfChildren, filters]);

  const geocodeAddress = useCallback(async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      return null;
    } catch (error) {
      return null;
    }
  }, []);

  const geocodeHotels = useCallback(
    async (hotelList) => {
      const hotelsWithCoordinates = await Promise.all(
        hotelList.map(async (hotel) => {
          const coordinates = await geocodeAddress(`${hotel.address}, ${hotel.city}`);
          return { ...hotel, coordinates };
        })
      );
      setHotelsWithCoords(hotelsWithCoordinates);
    },
    [geocodeAddress]
  );

  const geocodeCity = useCallback(async (cityName) => {
    if (!cityName) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (error) {
    }
  }, []);

  const doFetchHotels = useCallback(async () => {
    await dispatch(
      fetchFilteredHotels({
        city,
        checkInDate,
        checkOutDate,
        numOfAdults,
        numOfChildren,
        stars: filters.stars,
        amenities: filters.amenities,
      })
    );
    geocodeCity(city);
  }, [dispatch, city, checkInDate, checkOutDate, numOfAdults, numOfChildren, filters.stars, filters.amenities, geocodeCity]);

  useEffect(() => {
    if (city && checkInDate && checkOutDate) {
      doFetchHotels();
    }
  }, [city, checkInDate, checkOutDate, doFetchHotels]);

  useEffect(() => {
    dispatch(clearHotels());
    setHotelsWithCoords([]);
  }, [dispatch, city, checkInDate, checkOutDate]);

  useEffect(() => {
    if (status === "succeeded" && hotels.length > 0) {
      geocodeHotels(hotels);
    } else if (status === "succeeded" && hotels.length === 0) {
      setHotelsWithCoords([]);
    }
  }, [status, hotels, geocodeHotels]);

  const handleSearch = () => {
    setFilters(pendingFilters);
    doFetchHotels();
  };

  const handleApplyFilters = () => {
    setFilters(pendingFilters);
    doFetchHotels();
    setIsModalOpen(false);
  };

  return (
    <div className="hotel-search-page">
      <div className="map-container">
        <MapContainer center={mapCenter} zoom={10} style={{ height: "100%", width: "100%" }}>
          <UpdateMapCenter center={mapCenter} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {hotelsWithCoords.map((hotel) => {
            if (!hotel.coordinates) return null;
            return (
              <Marker key={hotel.id} position={[hotel.coordinates.lat, hotel.coordinates.lng]}>
                <Popup>
                  <h4>{hotel.name}</h4>
                  <p>Рейтинг: {hotel.averageRating}⭐</p>
                  <p>Цена за ночь: {hotel.pricePerNight} руб.</p>
                  <p>
                    Адрес: {hotel.city}, {hotel.address}
                  </p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="search-section">
        <SearchForm
          city={city}
          setCity={setCity}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          numOfAdults={numOfAdults}
          setNumOfAdults={setNumOfAdults}
          numOfChildren={numOfChildren}
          setNumOfChildren={setNumOfChildren}
          onSearch={handleSearch}
        />

        <div className="filter-button-container">
          <button className="filter-modal-button" onClick={() => setIsModalOpen(true)}>
            Фильтрация поиска
          </button>
        </div>

        {status === "loading" && <p>Загрузка отелей...</p>}
        {status === "failed" && <p className="error-message">{error}</p>}

        {status === "succeeded" && hotels.length === 0 && (
          <p>Нет доступных отелей для выбранных фильтров.</p>
        )}

        {status === "succeeded" && hotels.length > 0 && (
          <div className="hotel-results">
            {hotelsWithCoords.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={{
                  ...hotel,
                  tags: hotel.tags && hotel.tags.length > 0 ? hotel.tags : ["Wi-Fi", "Бассейн", "Ресторан"],
                }}
                city={city}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                amenities={filters.amenities}
                numOfAdults={numOfAdults}
                numOfChildren={numOfChildren || 0}
              />
            ))}
          </div>
        )}
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={handleApplyFilters}
        filters={pendingFilters}
        setFilters={setPendingFilters}
      />
    </div>
  );
};

export default HotelSearchPage;
