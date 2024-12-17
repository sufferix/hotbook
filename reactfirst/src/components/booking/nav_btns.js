// components/NavigationButtons.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="navigation-buttons">
      <button onClick={() => navigate("/")} className="btn-main">
        На главную
      </button>
      <button onClick={() => navigate("/dashboard/client")} className="btn-profile">
        В личный кабинет
      </button>
    </div>
  );
};

export default NavigationButtons;
