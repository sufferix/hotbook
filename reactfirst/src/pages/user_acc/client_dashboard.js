import React from "react";
import { useProfile } from "../../hooks/use_profile";
import { useState } from "react";
import ProfileEditForm from "../../components/account/profile_edit_form";
import BookingInfo from "../../components/account/booking_info";
import NoBooking from "../../components/account/no_booking";
import LogoutButton from "../../components/account/logout_button";
import OwnershipApplicationModal from "../../components/ownership/ownership_modal";
import "./client_dashboard.css";

function ClientDashboard() {
  const { profile, editing, startEditing, saveProfile } = useProfile({
    name: "",
    surname: "",
    email: "suffextra@gmail.com",
    phone: "",
  });

  const [hasBooking, setHasBooking] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние открытия модального окна

  const handleLogout = () => {
    console.log("Пользователь вышел из аккаунта");
  };

  return (
    <div className="client-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет</h1>
      </header>

      <div className="profile-section">
        <div className="avatar-placeholder"></div>
        <div>
          {!editing ? (
            <>
              <p className="user-name">
                {profile.name} {profile.surname}
              </p>
              <p className="user-email">{profile.email}</p>
              <button className="edit-button" onClick={startEditing}>
                Редактировать профиль
              </button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <ProfileEditForm initialData={profile} onSave={saveProfile} />
          )}
        </div>
      </div>

      {!editing && (
        <>
          <h2>Информация о бронировании</h2>
          {hasBooking ? <BookingInfo /> : <NoBooking />}
        </>
      )}
            <footer className="dashboard-footer">
        <a
          href="#"
          className="ownership-link"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          хочешь стать владельцем отеля?
        </a>
      </footer>
      {isModalOpen && (
        <OwnershipApplicationModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ClientDashboard;




