import React from "react";
import "./search_button.css";

function SearchButton({ onClick }) {
  return (
    <button className="search-button" onClick={onClick}>
      Найти
    </button>
  );
}

export default SearchButton;
