import React from "react";

function SearchButton({ onClick }) {
  return (
    <button className="search-button" onClick={onClick}>
      Найти
    </button>
  );
}

export default SearchButton;
