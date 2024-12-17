import React, { useState } from "react";
import axios from "axios";
import "./AuthModal.css";

axios.defaults.baseURL = "https://9023-2a09-bac1-61c0-8-00-388-a3.ngrok-free.app";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Переключение между формами
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  // Обработка логина
  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, role, statusCode, message } = response.data;

      if (statusCode === 200) {
        // Сохранение токена и роли в localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Перенаправление в зависимости от роли
        switch (role) {
          case "USER":
            window.location.href = "/client-dashboard";
            break;
          case "HOTELIER":
            window.location.href = "/owner-dashboard";
            break;
          case "ADMIN":
            window.location.href = "/admin-dashboard";
            break;
          default:
            console.error("Неизвестная роль пользователя");
            setErrorMessage("Неизвестная роль пользователя.");
        }

        onClose();
      } else {
        setErrorMessage(message || "Произошла ошибка, попробуйте снова.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Ошибка на сервере. Попробуйте позже."
      );
    }
  };

  // Обработка регистрации
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают.");
      return;
    }

    try {
      const response = await axios.post("/auth/register", { email, password });
      const { statusCode, message } = response.data;

      if (statusCode === 200) {
        alert("Регистрация успешна! Войдите в систему.");
        setIsLogin(true); // Переключаемся на форму логина
      } else {
        setErrorMessage(message || "Произошла ошибка, попробуйте снова.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Ошибка на сервере. Попробуйте позже."
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{isLogin ? "Путешествия ждут!" : "Регистрация"}</h2>

        {isLogin ? (
          // Форма входа
          <div className="form-container">
            <input
              type="email"
              placeholder="E-mail"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="link-container">
              <a href="#" className="forgot-link">
                Забыли пароль?
              </a>
              <button className="toggle-button" onClick={toggleForm}>
                Регистрация
              </button>
            </div>
            <button className="auth-button" onClick={handleLogin}>
              Войти
            </button>
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
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="auth-button" onClick={handleRegister}>
              Зарегистрироваться
            </button>
            <button className="toggle-button" onClick={toggleForm}>
              Войти
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;

