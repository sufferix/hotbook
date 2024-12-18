import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
//import { getUserRole } from "./hooks/user_role";
import Header from "./components/header/header";
import AuthModal from "./components/auth/AuthModal";
import Home from "./pages/homepage/home";
import HotelSearchPage from "./pages/search/hotel_search";
import HotelInfoPage from "./pages/hotel_page/hotel_page";
import ClientDashboard from "./pages/user_acc/client_dashboard";
import HotelOwnerDashboard from "./pages/owner_aсc/hotel_owner_dashboard";
import AdminDashboard from "./pages/admin_acc/admin_dashboard";
import BookingPage from "./pages/booking/booking_page";
import BookingSuccess from "./pages/booking/booking_success";
import "./App.css";
import axios from "axios";

// Использование переменной окружения
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleLoginModal = () => setIsModalOpen(!isModalOpen);

  // Обработчик для успешного входа/регистрации
  const handleLogin = () => {
    setIsAuthenticated(true); // Устанавливаем состояние авторизации
    setIsModalOpen(false); // Закрываем модальное окно
  };

  return (
    <Router>
      <div className="App">
        {/* Хедер с иконкой пользователя */}
        <Header
  isAuthenticated={isAuthenticated}
  onUserIconClick={toggleLoginModal}
/>

        {/* Основные маршруты */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<HotelSearchPage />} />
          <Route path="/info" element={<HotelInfoPage />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/owner-dashboard" element={<HotelOwnerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/success" element={<BookingSuccess />} />
        </Routes>

        {/* Модальное окно авторизации */}
        {isModalOpen && (
          <AuthModal
            onClose={() => setIsModalOpen(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
