import React, { useState } from "react";
import "./AuthModal.css";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
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
            <button className="auth-button">Войти</button>
          </div>
        ) : (
          // Форма регистрации
          <div className="form-container">
            <input type="email" placeholder="E-mail" className="input-field" />
            <input type="password" placeholder="Пароль" className="input-field" />
            <input type="password" placeholder="Повторите пароль" className="input-field" />
            <button className="auth-button">Регистрация</button>
            <button className="toggle-button" onClick={toggleForm}>Войти</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
