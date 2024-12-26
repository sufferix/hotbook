import React, { useState } from "react";

const ProfileEditForm = ({ initialData, onSave }) => {
  const [profile, setProfile] = useState({
    name: initialData?.name || "",
    surname: initialData?.surname || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
  });
  const [phoneError, setPhoneError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const formattedValue = formatPhoneNumber(value);
      setProfile({ ...profile, phoneNumber: formattedValue });
      validatePhoneNumber(formattedValue);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const formatPhoneNumber = (value) => {
    if (/^8/.test(value)) {
      return "+7" + value.slice(1);
    } else if (/^\d/.test(value)) {
      return "+7" + value;
    }
    return value;
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\+7\d{10}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Некорректный номер телефона. Пример: +79876543210");
    } else {
      setPhoneError(null);
    }
  };

  const handleSave = () => {
    if (phoneError) {
      alert("Исправьте ошибки перед сохранением");
      return;
    }
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
            name="phoneNumber"
            placeholder="Телефон"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {phoneError && <p className="error-message">{phoneError}</p>}
        <button type="button" className="save-button" onClick={handleSave}>
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default ProfileEditForm;


