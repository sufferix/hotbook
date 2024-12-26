import React from "react";
import CitySelector from "../main_booking/city_selector";
import DatePickerField from "../main_booking/date_picker_field";
import GuestCounter from "../main_booking/guest_counter";

const SearchForm = ({
  city,
  setCity,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  numOfAdults,
  setNumOfAdults,
  numOfChildren,
  setNumOfChildren,
  onSearch,
}) => {
  return (
    <div className="search-form">
      <div className="search-row">
        <div className="city-selector">
          <CitySelector city={city} setCity={setCity} />
        </div>
        <div className="date-picker-row">
          <DatePickerField
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onDateChange={(start, end) => {
              setCheckInDate(start);
              setCheckOutDate(end);
            }}
          />
        </div>
      </div>
      <div className="search-row">
        <div className="guest-counter">
          <GuestCounter
            numOfAdults={numOfAdults}
            setNumOfAdults={setNumOfAdults}
            numOfChildren={numOfChildren}
            setNumOfChildren={setNumOfChildren}
          />
        </div>
        <button className="search-button" onClick={onSearch}>
          Найти
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
