import React from "react";

const UsersTab = ({ users, onDelete, onBlock }) => {
  return (
    <div className="users-tab">
      <input
        type="text"
        className="search-input"
        placeholder="Введите пользователя"
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
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => onDelete(user.id)}>Удалить</button>
                <button onClick={() => onBlock(user.id)}>Заблокировать</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTab;
