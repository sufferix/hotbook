import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import Header from "./components/header/header";
import AuthModal from "./components/auth/AuthModal";
import Home from "./pages/homepage/home";
import HotelSearchPage from "./pages/search/hotel_search";
import HotelInfoPage from "./pages/hotel_page/hotel_page";
import ClientDashboard from "./pages/user_acc/client_dashboard";
import "./App.css";

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
          <Route path="/dashboard/client" element={<ClientDashboard />} />
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
