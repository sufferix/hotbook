import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между входом и регистрацией
  const navigate = useNavigate(); // Хук для перенаправления

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    // Имитация успешного входа
    onClose();
    navigate("/dashboard/client"); // Перенаправление на личный кабинет клиента
  };

  const handleRegister = () => {
    // Имитация успешной регистрации
    onClose();
    navigate("/dashboard/client"); // Перенаправление на личный кабинет клиента
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Путешествия ждут!</h2>

        {isLogin ? (
          // Форма входа
          <div className="form-container">
            <input type="email" placeholder="E-mail" className="input-field" />
            <input type="password" placeholder="Пароль" className="input-field" />
            <div className="link-container">
              <a href="#" className="forgot-link">Забыли пароль?</a>
              <button className="toggle-button" onClick={toggleForm}>Регистрация</button>
            </div>
            <button className="auth-button" onClick={handleLogin}>Войти</button>
          </div>
        ) : (
          // Форма регистрации
          <div className="form-container">
            <input type="email" placeholder="E-mail" className="input-field" />
            <input type="password" placeholder="Пароль" className="input-field" />
            <input type="password" placeholder="Повторите пароль" className="input-field" />
            <button className="auth-button" onClick={handleRegister}>Регистрация</button>
            <button className="toggle-button" onClick={toggleForm}>Войти</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
