import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components//header/header";
import AuthModal from "./components/auth/AuthModal";
import Home from "./pages/homepage/home";
import HotelSearchPage from "./pages/search/hotel_search";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Хедер с логотипом и иконкой пользователя */}
        <Header onIconClick={toggleLoginModal} />

        {/* Маршруты */}
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Home />} />

          {/* Страница поиска отелей */}
          <Route path="/search" element={<HotelSearchPage />} />
        </Routes>

        {/* Модальное окно для авторизации */}
        {isModalOpen && <AuthModal onClose={toggleLoginModal} />}
      </div>
    </Router>
  );
}

export default App;
