import React, { useState } from "react";
import ProfileEditForm from "../../components/account/profile_edit_form";
import BookingInfo from "../../components/account/booking_info";
import NoBooking from "../../components/account/no_booking";
import "./client_dashboard.css";

function ClientDashboard() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "suffextra@gmail.com",
    phone: "",
  });

  const [editing, setEditing] = useState(false); // Состояние редактирования профиля
  const [hasBooking, setHasBooking] = useState(true); // Состояние наличия бронирования

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser); // Сохраняем обновленные данные
    setEditing(false); // Закрываем форму редактирования
  };

  if (editing) {
    // Если пользователь редактирует профиль, отображаем только форму редактирования
    return (
      <div className="client-dashboard">
        <header className="dashboard-header">
          <h1>Личный кабинет</h1>
        </header>
        <ProfileEditForm user={user} onSave={handleSaveProfile} />
      </div>
    );
  }

  return (
    <div className="client-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет</h1>
      </header>
      <div className="profile-section">
        <div className="avatar-placeholder"></div>
        <div>
          <p className="user-name">{user.name} {user.surname}</p>
          <p className="user-email">{user.email}</p>
          <button
            className="edit-button"
            onClick={() => setEditing(true)}
          >
            редактировать профиль
          </button>
        </div>
      </div>
      <h2>Информация о бронировании</h2>
      {hasBooking ? <BookingInfo /> : <NoBooking />}
    </div>
  );
}

export default ClientDashboard;

