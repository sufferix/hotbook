import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isBefore} from "date-fns";

const DatePickerField = ({ checkInDate, checkOutDate, onDateChange }) => {
  useEffect(() => {

    const minCheckOutDate = addDays(checkInDate, 2);
    if (isBefore(checkOutDate, minCheckOutDate)) {
      onDateChange(checkInDate, minCheckOutDate);
    }
  }, [checkInDate, checkOutDate, onDateChange]);

  const handleCheckInDateChange = (date) => {
    if (isBefore(date, new Date())) return;

    const minCheckOutDate = addDays(date, 2);
    const newCheckOutDate = isBefore(checkOutDate, minCheckOutDate)
      ? minCheckOutDate
      : checkOutDate;

    onDateChange(date, newCheckOutDate);
  };

  const handleCheckOutDateChange = (date) => {
    const minCheckOutDate = addDays(checkInDate, 2);
    if (isBefore(date, minCheckOutDate)) {
      onDateChange(checkInDate, minCheckOutDate);
      return;
    }

    onDateChange(checkInDate, date);
  };

  return (
    <div className="booking-calendar">
      <div className="calendar-field">
        <label className="calendar-label">Заезд</label>
        <DatePicker
          selected={checkInDate}
          className="date-input"
          onChange={handleCheckInDateChange}
          minDate={new Date()}
          dateFormat="dd MMM yyyy"
        />
      </div>
      <div className="calendar-field">
        <label className="calendar-label">Выезд</label>
        <DatePicker
          selected={checkOutDate}
          className="date-input"
          onChange={handleCheckOutDateChange}
          minDate={addDays(checkInDate, 2)}
          dateFormat="dd MMM yyyy"
        />
      </div>
    </div>
  );
};

export default DatePickerField;
