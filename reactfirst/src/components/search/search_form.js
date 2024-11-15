import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchForm = ({ city, setCity, startDate, setStartDate, endDate, setEndDate, guests, setGuests }) => {
  const handleGuestChange = (delta) => {
    setGuests((prev) => Math.max(1, prev + delta));
  };

  return (
<div className="search-form">
      <div className="form-group">
        <select
          className="input-field"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="Санкт-Петербург">Санкт-Петербург</option>
          <option value="Москва">Москва</option>
          <option value="Сочи">Сочи</option>
          <option value="Екатеринбург">Екатеринбург</option>
        </select>
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd.MMM"
        className="input-field"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="dd.MMM"
        className="input-field"
      />
      <div className="guest-counter">
        <button className="guest-button" onClick={() => handleGuestChange(-1)}>-</button>
        <span>{guests} чел.</span>
        <button className="guest-button" onClick={() => handleGuestChange(1)}>+</button>
      </div>
      <button className="search-button">Найти</button>
    </div>
  );
};

export default SearchForm;