import React from "react";

const Filters = ({ filters, handleFilterClick }) => {
  const filterOptions = [
    "Можно с животными",
    "Завтрак включен",
    "5*",
    "Близко к центру",
    "Высокий рейтинг",
  ];

  return (
    <div className="filters">
      {filterOptions.map((filter) => (
        <button
          key={filter}
          className={`filter-button ${filters.includes(filter) ? "active" : ""}`}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filters;