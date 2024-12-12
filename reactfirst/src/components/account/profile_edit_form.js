import React, { useState } from "react";

const ProfileEditForm = ({ initialData, onSave }) => {
  const [profile, setProfile] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    onSave(profile);
  };

  return (
    <div className="profile-edit-form">
      <h2>Редактирование профиля</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="surname"
            placeholder="Фамилия"
            value={profile.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            value={profile.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={profile.phone || ""}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="save-button" onClick={handleSave}>
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default ProfileEditForm;

