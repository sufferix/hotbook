import React, { useState } from "react";
import CitySelector from "./city_selector";
import DatePickerField from "./date_picker_field";
import GuestCounter from "./guest_counter";
import SearchButton from "./search_button";
import axios from "axios";

function Booking() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!city || !startDate || !endDate || guests <= 0) {
      setErrorMessage("Заполните все поля!");
      return;
    }

    try {
      const response = await axios.get("/hotels/filter", {
        params: {
          city,
          checkInDate: startDate.toISOString().split("T")[0],
          checkOutDate: endDate.toISOString().split("T")[0],
          guests,
        },
      });

      console.log("Доступные отели:", response.data.hotelList);
    } catch (error) {
      setErrorMessage("Ошибка поиска отелей");
    }
  };

  return (
    <div className="booking-container">
      <CitySelector city={city} setCity={setCity} />
      <div className="booking-options-row">
        <DatePickerField
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
        <GuestCounter guests={guests} setGuests={setGuests} />
      </div>
      <SearchButton onClick={handleSearch} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Booking;




