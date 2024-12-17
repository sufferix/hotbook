import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileEditForm from "../../components/account/profile_edit_form";
import BookingInfo from "../../components/account/booking_info_acc";
import NoBooking from "../../components/account/no_booking";
import LogoutButton from "../../components/account/logout_button";
import OwnershipApplicationModal from "../../components/ownership/ownership_modal";
import "./client_dashboard.css";

function ClientDashboard() {
  const [profile, setProfile] = useState(null); // Начальное состояние null
  const [editing, setEditing] = useState(false);
  const [bookings, setBookings] = useState([]); // Состояние для бронирований
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

  // Получение профиля и бронирований пользователя при загрузке
  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        console.log("Начало запроса профиля...");
        const profileResponse = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Профиль загружен:", profileResponse.data);
        setProfile(profileResponse.data.user);
  
        console.log("Начало запроса бронирований...");
        const bookingsResponse = await axios.get("/api/bookings/my", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Бронирования загружены:", bookingsResponse.data);
        setBookings(bookingsResponse.data.bookings || []);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
  
    fetchProfileAndBookings();
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

  if (!profile) {
    // Отображаем заглушку или спиннер, пока профиль не загружен
    return <div>Загрузка...</div>;
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
              <p className="user-phone">{profile.phoneNumber}</p>
              <button className="edit-button" onClick={() => setEditing(true)}>
                Редактировать профиль
              </button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <ProfileEditForm initialData={profile} onSave={handleSaveProfile} />
          )}
        </div>
      </div>

      {/* Информация о бронированиях */}
      {!editing && (
        <>
          <h2>Мои бронирования</h2>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingInfo
                key={booking.id}
                hotelName={booking.hotelName}
                roomType={booking.roomType}
                checkInDate={booking.checkInDate}
                checkOutDate={booking.checkOutDate}
                totalPrice={booking.totalPrice}
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
          Хочешь стать владельцем отеля?
        </a>
      </footer>

      {isModalOpen && (
        <OwnershipApplicationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default ClientDashboard;




