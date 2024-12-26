import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUserProfile, saveUserProfile } from "../../redux/slices/userSlice";
import { loadBookings, cancelBooking } from "../../redux/slices/bookingSlice";
import ProfileEditForm from "../../components/account/profile_edit_form";
import BookingInfo from "../../components/account/booking_info_acc";
import NoBooking from "../../components/account/no_booking";
import LogoutButton from "../../components/account/logout_button";
import OwnershipApplicationModal from "../../components/ownership/ownership_modal";
import "./client_dashboard.css";

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status, error } = useSelector((state) => state.user || {});
  const { list: bookings, status: bookingStatus, error: bookingError } = useSelector((state) => state.bookings);

  const [editing, setEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(loadUserProfile());
    dispatch(loadBookings());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && profile) {
      const role = profile.role;
      switch (role) {
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        case "HOTELIER":
          navigate("/owner-dashboard");
          break;
        case "USER":
          break;
        default:
          navigate("/");
      }
    }
  }, [status, profile, navigate]);


  const handleSaveProfile = async (updatedProfile) => {
    await dispatch(saveUserProfile(updatedProfile));
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleCancelBooking = (bookingId) => {
    dispatch(cancelBooking(bookingId));
  };

  if (status === "loading" || bookingStatus === "loading") {
    return <p>Загрузка...</p>;
  }

  if (status === "failed") {
    return <p>Ошибка: {error}</p>;
  }

  if (bookingStatus === "failed") {
    return <p>Ошибка загрузки бронирований: {bookingError}</p>;
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
                {(() => {
                  const nameParts = [profile?.name, profile?.surname]
                    .filter((part) => part && part.trim().toLowerCase() !== "null");
                  return nameParts.length > 0 ? nameParts.join(" ") : "Аноним";
                })()}
              </p>
              <p className="user-email">{profile?.email}</p>
              <button className="edit-button" onClick={() => setEditing(true)}>Редактировать профиль</button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <ProfileEditForm initialData={profile} onSave={handleSaveProfile} />
          )}
        </div>
      </div>

      {!editing && (
        <>
          <h2>Мои бронирования</h2>
          {bookings.length ? (
            bookings.map((booking) => (
              <BookingInfo
                key={booking.id}
                hotelName={booking.hotelName}
                roomType={booking.roomType}
                checkInDate={booking.checkInDate}
                checkOutDate={booking.checkOutDate}
                adults={booking.numOfAdults}
                children={booking.numOfChildren}
                imageUrl={booking.hotelPhotoUrl}
                surname={booking.fullName}
                price={booking.totalCost}
                onCancel={() => handleCancelBooking(booking.id)}
              />
            ))
          ) : (
            <NoBooking />
          )}
        </>
      )}

      <footer className="dashboard-footer">
        <a
          href="/ownership-application"
          className="ownership-link"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          Хочешь стать владельцем отеля?
        </a>
      </footer>

      {isModalOpen && <OwnershipApplicationModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ClientDashboard;
