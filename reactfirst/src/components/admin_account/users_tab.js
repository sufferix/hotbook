import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBan, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { translateRole } from "../../utils/roleTranslations";
import "./users_tab.css";

const UsersTab = ({ users, status, error, onDelete, onBlock }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (status === "loading") {
    return <p>Загрузка списка пользователей...</p>;
  }

  if (status === "failed") {
    return <p className="error-message">Ошибка: {error}</p>;
  }


  const filteredUsers = users.filter((user) => {
    const searchString = `${user.name || ""} ${user.surname || ""} ${user.email || ""} ${translateRole(user.role) || ""}`
      .toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="users-tab">
      <input
        type="text"
        className="search-input"
        placeholder="Введите имя, фамилию, почту или роль"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="users-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Почта</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name || "Не указано"}</td>
              <td>{user.surname || "Не указано"}</td>
              <td>{user.email}</td>
              <td>{translateRole(user.role)}</td>
              <td>
                {user.role !== "ADMIN" && (
                  <div className="actions">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="action-icon delete-icon"
                      title="Удалить"
                      onClick={() => onDelete(user.id)}
                    />
                    <FontAwesomeIcon
                      icon={faBan}
                      className="action-icon block-icon"
                      title="Заблокировать"
                      onClick={() => onBlock(user.id, false)}
                    />
                    <FontAwesomeIcon
                      icon={faUnlock}
                      className="action-icon unblock-icon"
                      title="Разблокировать"
                      onClick={() => onBlock(user.id, true)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTab;
