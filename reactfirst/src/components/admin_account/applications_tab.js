import React from "react";

const ApplicationsTab = ({ applications, onAccept, onReject }) => {
  return (
    <div className="applications-tab">
      <table className="applications-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th>Почта</th>
            <th>Название отеля</th>
            <th>Адрес</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.surname}</td>
              <td>{app.phone}</td>
              <td>{app.email}</td>
              <td>{app.hotelName}</td>
              <td>{app.hotelAddress}</td>
              <td>
                <button onClick={() => onAccept(app.id)}>Принять</button>
                <button onClick={() => onReject(app.id)}>Отклонить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTab;
