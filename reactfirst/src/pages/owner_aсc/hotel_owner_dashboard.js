import React from "react";
import { useProfile } from "../../hooks/use_profile";
import ProfileEditForm from "../../components/account/profile_edit_form";
import LogoutButton from "../../components/account/logout_button"; // Импортируем компонент
import "./hotel_owner_dashboard.css";

const HotelOwnerDashboard = () => {
  const { profile, editing, startEditing, saveProfile } = useProfile({
    name: "Анзор",
    surname: "Магомедов",
    email: "anzor@example.com",
  });

  const [hotel, setHotel] = React.useState({
    name: "Название отеля",
    address: "г. Москва, ул. Пушкина, д. 6",
    stars: 3,
  });

  const handleEditHotel = () => {
    console.log("Редактировать отель");
  };

  const handleLogout = () => {
    console.log("Владелец вышел из аккаунта");
  };

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
              <button className="edit-profile-button" onClick={startEditing}>
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
        <h2>Мой отель</h2>
        <div className="hotel-card">
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
          <button className="edit-hotel-button" onClick={handleEditHotel}>
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelOwnerDashboard;



