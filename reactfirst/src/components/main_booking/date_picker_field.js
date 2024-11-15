import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerField({ label, selectedDate, setDate }) {
  return (
    <div className="date-picker-container">
      <label className="booking-label">{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setDate(date)}
        dateFormat="dd MMM"
        className="date-input"
      />
    </div>
  );
}

export default DatePickerField;
