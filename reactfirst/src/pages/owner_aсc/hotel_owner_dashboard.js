import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProfile, saveUserProfile } from "../../redux/slices/userSlice";
import { fetchOwnerHotels, deleteOwnerHotel } from "../../redux/slices/ownerHotelSlice";
import ProfileEditForm from "../../components/account/profile_edit_form";
import LogoutButton from "../../components/account/logout_button";
import OwnerHotelCard from "../../components/owner_account/owner_hotel_card";
import { useNavigate } from 'react-router-dom';
import "./hotel_owner_dashboard.css";

const HotelOwnerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status: userStatus, error: userError } = useSelector((state) => state.user || {});
  const { hotels, status: hotelsStatus, error: hotelsError } = useSelector((state) => state.ownerHotels);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userStatus === "succeeded" && profile?.role === "HOTELIER") {
      dispatch(fetchOwnerHotels());
    }
  }, [userStatus, profile, dispatch]);

  const handleSaveProfile = async (updatedProfile) => {
    await dispatch(saveUserProfile(updatedProfile));
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDeleteHotel = (hotelId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот отель?")) {
      dispatch(deleteOwnerHotel(hotelId));
    }
  };

  if (userStatus === "loading" || hotelsStatus === "loading") {
    return <p>Загрузка...</p>;
  }

  if (userStatus === "failed") {
    return <p>Ошибка: {userError}</p>;
  }

  if (hotelsStatus === "failed") {
    return <p>Ошибка загрузки отелей: {hotelsError}</p>;
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
                {profile?.name} {profile?.surname}
              </p>
              <p className="owner-role">Владелец отеля</p>
              <button
                className="edit-profile-button"
                onClick={() => setEditing(true)}
              >
                Редактировать профиль
              </button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <ProfileEditForm
              initialData={profile}
              onSave={handleSaveProfile}
            />
          )}
        </div>
      </div>

      <div className="hotel-section">
        <div className="hotel-section-header">
          <h2>Мои отели</h2>
          <button className="add-hotel-button" onClick={() => navigate('/add-hotel')}>
            Добавить отель
          </button>
        </div>
        {hotels.length ? (
          hotels.map((hotel) => (
            <OwnerHotelCard
              key={hotel.id}
              hotel={hotel}
              onEdit={() => navigate(`/edit-hotel/${hotel.id}`)}
              onDelete={() => handleDeleteHotel(hotel.id)}
            />
          ))
        ) : (
          <p>У вас пока нет добавленных отелей.</p>
        )}
      </div>
    </div>
  );
};

export default HotelOwnerDashboard;
