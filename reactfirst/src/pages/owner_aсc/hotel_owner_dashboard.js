import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileEditForm from "../../components/account/profile_edit_form";
import LogoutButton from "../../components/account/logout_button";
import "./hotel_owner_dashboard.css";

axios.defaults.baseURL = "https://your-api-url.com";

function HotelOwnerDashboard() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Загрузка профиля
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await axios.get("/users/profile");
      setProfile(response.data.user);
    } catch (error) {
      setErrorMessage("Ошибка загрузки профиля");
    }
  };

  // Загрузка отелей владельца
  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await axios.get("/users/my-hotels");
      setHotels(response.data.hotelList || []);
    } catch (error) {
      setErrorMessage("Ошибка загрузки отелей");
    }
  };

  const saveProfile = async (updatedProfile) => {
    try {
      const response = await axios.put("/users/profile", updatedProfile);
      setProfile(response.data.user);
      setEditing(false);
    } catch (error) {
      setErrorMessage("Ошибка сохранения профиля");
    }
  };

  const handleEditHotel = (hotelId) => {
    console.log(`Редактирование отеля с ID ${hotelId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!profile) {
    return <p>Загрузка профиля...</p>;
  }

  return (
    <div className="hotel-owner-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет владельца</h1>
      </header>

      <div className="profile-section">
        <div className="avatar-placeholder"></div>
        <div>
          {!editing ? (
            <>
              <p className="owner-name">
                {profile.name} {profile.surname}
              </p>
              <p className="owner-role">владелец отеля</p>
              <button className="edit-profile-button" onClick={() => setEditing(true)}>
                Редактировать профиль
              </button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <ProfileEditForm initialData={profile} onSave={saveProfile} />
          )}
        </div>
      </div>

      <div className="hotel-section">
        <h2>Мои отели</h2>
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <div className="hotel-image-placeholder">Фото</div>
            <div className="hotel-info">
              <p className="hotel-name">{hotel.name}</p>
              <p className="hotel-address">{hotel.city}</p>
              <p className="hotel-stars">
                {Array(hotel.stars)
                  .fill("⭐")
                  .join(" ")}
              </p>
            </div>
            <button
              className="edit-hotel-button"
              onClick={() => handleEditHotel(hotel.id)}
            >
              Изменить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelOwnerDashboard;





