import React, { useState } from "react";
import CitySelector from "./city_selector";
import DatePickerField from "./date_picker_field";
import GuestCounter from "./guest_counter";
import SearchButton from "./search_button";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [city, setCity] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numOfAdults, setNumOfAdults] = useState(1);
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city.trim()) {
      setError("Пожалуйста, выберите город.");
      return;
    }

    setError("");
    if (!checkInDate || !checkOutDate) {
      console.error("Не выбраны даты заезда или выезда.");
      return;
    }

    navigate("/search", {
      state: {
        city,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        numOfAdults,
        numOfChildren: numOfChildren || 0,
      },
    });
  };

  return (
    <div className="booking-container">
      <CitySelector city={city} setCity={setCity} />

      <div className="booking-options-row">
        <DatePickerField
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onDateChange={(start, end) => {
            setCheckInDate(start);
            setCheckOutDate(end);
          }}
        />
        <GuestCounter
          numOfAdults={numOfAdults}
          setNumOfAdults={setNumOfAdults}
          numOfChildren={numOfChildren}
          setNumOfChildren={setNumOfChildren}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="button-container">
        <SearchButton onClick={handleSearch} disabled={!city.trim()} />
      </div>
    </div>
  );
}

export default Booking;
