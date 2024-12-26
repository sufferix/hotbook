import React from "react";

const Filters = ({ filters, handleFilterClick }) => (
  <div className="filters">
    <button
      className="filter-button all-filters"
      onClick={handleFilterClick}
    >
      Фильтрация поиска
    </button>
  </div>
);

export default Filters;
