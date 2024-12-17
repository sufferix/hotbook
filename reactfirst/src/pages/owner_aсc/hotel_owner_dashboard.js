import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileEditForm from "../../components/account/profile_edit_form";
import LogoutButton from "../../components/account/logout_button";
import "./hotel_owner_dashboard.css";

const HotelOwnerDashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });
  const [editing, setEditing] = useState(false);
  const [hotels, setHotels] = useState([]); // Состояние для списка отелей владельца

  // Получение данных профиля и списка отелей владельца
  useEffect(() => {
    const fetchProfileAndHotels = async () => {
      try {
        // Получение профиля владельца отеля
        const profileResponse = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(profileResponse.data.user);

        // Получение списка отелей текущего владельца
        const hotelsResponse = await axios.get("/api/users/my-hotels", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setHotels(hotelsResponse.data.hotelList || []);
      } catch (error) {
        console.error("Ошибка при получении данных профиля и отелей:", error);
      }
    };

    fetchProfileAndHotels();
  }, []);

  // Сохранение отредактированного профиля
  const handleSaveProfile = async (updatedProfile) => {
    try {
      const response = await axios.put("/api/users/profile", updatedProfile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfile(response.data.user);
      setEditing(false);
      alert("Профиль успешно обновлен!");
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error);
      alert("Не удалось сохранить изменения профиля.");
    }
  };

  // Обработка выхода из системы
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const handleEditHotel = (hotelId) => {
    // Перенаправление на страницу редактирования отеля (если есть отдельный маршрут)
    window.location.href = `/edit-hotel/${hotelId}`;
  };

  return (
    <div className="hotel-owner-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет владельца отеля</h1>
      </header>

      <div className="profile-section">
        <div className="avatar-placeholder"></div>
        <div>
          {!editing ? (
            <>
              <p className="owner-name">
                {profile.name} {profile.surname}
              </p>
              <p className="owner-email">{profile.email}</p>
              <p className="owner-phone">{profile.phoneNumber}</p>
              <button className="edit-profile-button" onClick={() => setEditing(true)}>
                Редактировать профиль
              </button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <ProfileEditForm initialData={profile} onSave={handleSaveProfile} />
          )}
        </div>
      </div>

      {/* Список отелей владельца */}
      {!editing && (
        <>
          <h2>Мои отели</h2>
          <div className="hotels-list">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card">
                  <div className="hotel-image-placeholder">Фото</div>
                  <div className="hotel-info">
                    <p className="hotel-name">{hotel.name}</p>
                    <p className="hotel-address">{hotel.address}</p>
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
              ))
            ) : (
              <p>У вас пока нет добавленных отелей.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HotelOwnerDashboard;




