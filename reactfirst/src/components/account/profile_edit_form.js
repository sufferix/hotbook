import React, { useState } from "react";

function ProfileEditForm({ user, onSave }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="profile-edit-form">
      <h2>Редактирование профиля</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="surname"
            placeholder="Фамилия"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            readOnly
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-button">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default ProfileEditForm;
