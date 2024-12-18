import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isBefore } from "date-fns";

const DatePickerField = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 2)); // Стартовое ограничение на 2 дня

  // Обновление начальной даты
  const handleStartDateChange = (date) => {
    if (isBefore(date, new Date())) {
      return; // Игнорируем даты в прошлом
    }
    setStartDate(date);
    const minEndDate = addDays(date, 2); // Минимум два дня между датами
    if (isBefore(endDate, minEndDate)) {
      setEndDate(minEndDate);
    }
    onDateChange(date, endDate);
  };

  // Обновление конечной даты
  const handleEndDateChange = (date) => {
    if (isBefore(date, addDays(startDate, 2))) {
      return; // Минимум два дня бронирования
    }
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
          minDate={new Date()} // Ограничение на прошедшие дни
          dateFormat="dd MMM yyyy" // Формат с годом
        />
      </div>
      <div className="calendar-field">
        <label className="calendar-label">Выезд</label>
        <DatePicker
          selected={endDate}
          className="date-input"
          onChange={handleEndDateChange}
          minDate={addDays(startDate, 2)} // Минимум два дня между датами
          dateFormat="dd MMM yyyy"
        />
      </div>
    </div>
  );
};

export default DatePickerField;

