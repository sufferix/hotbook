import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isBefore } from "date-fns";

const DatePickerField = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 2));

  const handleStartDateChange = (date) => {
    if (isBefore(date, new Date())) return;
    setStartDate(date);
    const minEndDate = addDays(date, 2);
    if (isBefore(endDate, minEndDate)) {
      setEndDate(minEndDate);
    }
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    if (isBefore(date, addDays(startDate, 2))) return;
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div className="booking-calendar">
      <div className="calendar-field">
        <label className="calendar-label">Заезд</label>
        <DatePicker
          selected={startDate}
          className="date-input"
          onChange={handleStartDateChange}
          minDate={new Date()}
          dateFormat="dd MMM yyyy"
        />
      </div>
      <div className="calendar-field">
        <label className="calendar-label">Выезд</label>
        <DatePicker
          selected={endDate}
          className="date-input"
          onChange={handleEndDateChange}
          minDate={addDays(startDate, 2)}
          dateFormat="dd MMM yyyy"
        />
      </div>
    </div>
  );
};

export default DatePickerField;


