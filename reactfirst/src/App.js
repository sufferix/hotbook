import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
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
import AddHotel from './components/owner_account/AddHotel';
import EditHotel from './components/owner_account/EditHotel';
import "./App.css";

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleLoginModal = () => {
    if (isAuthenticated) {
      const role = localStorage.getItem("role");
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
      }
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} onUserIconClick={toggleLoginModal} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<HotelSearchPage />} />
          <Route path="/hotels/:id" element={<HotelInfoPage />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/owner-dashboard" element={<HotelOwnerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} /> 
          <Route path="/add-hotel" element={<AddHotel />} />
        </Routes>

        {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} onLogin={handleLogin} />}
      </div>
    </Router>
  );
}

export default App;