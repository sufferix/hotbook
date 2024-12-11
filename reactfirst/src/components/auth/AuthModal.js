import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthModal.css";

// Настройка базового URL для удалённого сервера
axios.defaults.baseURL = "https://db87-2a09-bac5-51e2-632-00-9e-28.ngrok-free.app";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между входом и регистрацией
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Хук для перенаправления

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/users/login", { email, password });
      const data = response.data;

      if (data.statusCode === 200) {
        localStorage.setItem("token", data.token);
        onClose();
        navigate("/dashboard/client");
      } else {
        setErrorMessage(data.message || "Ошибка. Попробуйте снова.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Сервер временно недоступен."
      );
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают.");
      return;
    }

    try {
      const response = await axios.post("/users/register", { email, password });
      const data = response.data;

      if (data.statusCode === 200) {
        onClose();
        navigate("/dashboard/client");
      } else {
        setErrorMessage(data.message || "Ошибка. Попробуйте снова.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Сервер временно недоступен."
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Путешествия ждут!</h2>

        {isLogin ? (
          // Форма входа
          <div className="form-container">
            <input
              type="email"
              placeholder="E-mail"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="link-container">
              <a href="#" className="forgot-link">Забыли пароль?</a>
              <button className="toggle-button" onClick={toggleForm}>Регистрация</button>
            </div>
            <button className="auth-button" onClick={handleLogin}>Войти</button>
          </div>
        ) : (
          // Форма регистрации
          <div className="form-container">
            <input
              type="email"
              placeholder="E-mail"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="auth-button" onClick={handleRegister}>Регистрация</button>
            <button className="toggle-button" onClick={toggleForm}>Войти</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;

