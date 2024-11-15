import React, { useState } from "react";
import CitySelector from "./city_selector";
import DatePickerField from "./date_picker_field";
import GuestCounter from "./guest_counter";
import SearchButton from "./search_button";
import "./booking.css";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [city, setCity] = useState("Санкт-Петербург, Россия");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const navigate = useNavigate();

  const handleSearch = () => {
    //alert(`Город: ${city}, Заезд: ${startDate}, Выезд: ${endDate}, Гостей: ${guests}`);
    navigate("/search");
  };

  return (
    <div className="booking-container">
      <CitySelector city={city} setCity={setCity} />
      <div className="booking-options-row">
        <DatePickerField
          label="Заезд"
          selectedDate={startDate}
          setDate={setStartDate}
        />
        <DatePickerField
          label="Выезд"
          selectedDate={endDate}
          setDate={setEndDate}
        />
        <GuestCounter guests={guests} setGuests={setGuests} />
      </div>
      <SearchButton onClick={handleSearch} />
    </div>
  );
}

export default Booking;



