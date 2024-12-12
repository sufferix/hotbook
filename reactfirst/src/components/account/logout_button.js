import React from "react";
import { useNavigate } from "react-router-dom";
import "./logout_button.css"; // Подключаем стили для кнопки

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Выполняем функцию выхода
    navigate("/"); // Перенаправляем на главную страницу
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Выйти из аккаунта
    </button>
  );
};

export default LogoutButton;
