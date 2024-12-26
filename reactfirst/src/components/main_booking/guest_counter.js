import React, { useState, useRef, useEffect } from "react";

const GuestCounter = ({ numOfAdults, setNumOfAdults, numOfChildren, setNumOfChildren }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  return (
    <div className="guest-counter-container" ref={dropdownRef}>
      <label className="guest-counter-label">Количество гостей</label>
      <div className="guest-input" onClick={toggleDropdown}>
        <span>{numOfAdults} взрослых, {numOfChildren} детей</span>
      </div>
      {isDropdownOpen && (
        <div className="guest-dropdown">
          <div className="counter">
            <span>Взрослые</span>
            <div className="buttons">
              <button
                onClick={() => setNumOfAdults((prev) => Math.max(1, prev - 1))}
                disabled={numOfAdults === 1}
              >
                -
              </button>
              <span>{numOfAdults}</span>
              <button onClick={() => setNumOfAdults((prev) => prev + 1)}>+</button>
            </div>
          </div>
          <div className="counter">
            <span>Дети</span>
            <div className="buttons">
              <button
                onClick={() => setNumOfChildren((prev) => Math.max(0, prev - 1))}
                disabled={numOfChildren === 0}
              >
                -
              </button>
              <span>{numOfChildren}</span>
              <button onClick={() => setNumOfChildren((prev) => prev + 1)}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCounter;
