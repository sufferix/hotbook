import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/slices/authSlice";
import "./AuthModal.css";
import { useNavigate } from "react-router-dom";

function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setValidationError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setValidationError("Введите корректный email.");
      return;
    }

    setValidationError("");
    dispatch(login({ email, password })).then((action) => {
      if (action.type === "auth/login/fulfilled") {
        const { token, role } = action.payload;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        onLogin();
        onClose();

        switch (role) {
          case "USER":
            navigate("/client-dashboard");
            break;
          case "HOTELIER":
            navigate("/owner-dashboard");
            break;
          case "ADMIN":
            navigate("/admin-dashboard");
            break;
          default:
            console.error("Неизвестная роль пользователя");
        }
      }
    });
  };

  const handleRegister = () => {
    if (!validateEmail(email)) {
      setValidationError("Введите корректный email.");
      return;
    }
    if (!validatePassword(password)) {
      setValidationError(
        "Пароль должен быть не менее 5 символов, содержать латинские буквы и цифры."
      );
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Пароли не совпадают.");
      return;
    }

    setValidationError("");
    dispatch(register({ email, password })).then((action) => {
      if (action.type === "auth/register/fulfilled") {
        toggleForm();
      }
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{isLogin ? "Путешествия ждут!" : "Регистрация"}</h2>
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
          {!isLogin && (
            <input
              type="password"
              placeholder="Повторите пароль"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          {validationError && <p className="error-message">{validationError}</p>}
          {error && <p className="error-message">{error}</p>}
          {isLogin ? (
            <>
              <button
                className="auth-button"
                onClick={handleLogin}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Вход..." : "Войти"}
              </button>
              <button className="toggle-button" onClick={toggleForm}>
                Регистрация
              </button>
            </>
          ) : (
            <>
              <button
                className="auth-button"
                onClick={handleRegister}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Регистрация..." : "Зарегистрироваться"}
              </button>
              <button className="toggle-button" onClick={toggleForm}>
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;