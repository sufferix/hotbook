import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileEditForm from "../../components/account/profile_edit_form";
import BookingInfo from "../../components/account/booking_info_acc";
import NoBooking from "../../components/account/no_booking";
import LogoutButton from "../../components/account/logout_button";
import OwnershipApplicationModal from "../../components/ownership/ownership_modal";
import "./client_dashboard.css";

function ClientDashboard() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [hasBooking, setHasBooking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProfile();
    loadBookings();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await axios.get("/users/profile");
      setProfile(response.data.user);
    } catch (error) {
      setErrorMessage("Ошибка загрузки профиля");
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

  const loadBookings = async () => {
    try {
      const response = await axios.get("/bookings");
      setBookings(response.data.bookings);
      setHasBooking(response.data.bookings.length > 0);
    } catch (error) {
      setErrorMessage("Ошибка загрузки бронирований");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/bookings/${bookingId}/cancel`);
      loadBookings();
    } catch (error) {
      setErrorMessage("Ошибка отмены бронирования");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!profile) {
    return <p>Загрузка профиля...</p>;
  }

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
              <button className="edit-button" onClick={() => setEditing(true)}>
                Редактировать профиль
              </button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <ProfileEditForm
              initialData={profile}
              onSave={saveProfile}
            />
          )}
        </div>
      </div>

      {!editing && (
        <>
          <h2>Информация о бронировании</h2>
          {hasBooking ? (
            bookings.map((booking) => (
              <BookingInfo
                key={booking.id}
                booking={booking}
                onCancel={() => cancelBooking(booking.id)}
              />
            ))
          ) : (
            <NoBooking />
          )}
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
        <OwnershipApplicationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default ClientDashboard;





