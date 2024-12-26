import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./applications_tab.css";

const ApplicationsTab = ({ applications, status, error, onAccept, onReject }) => {
  if (status === "loading") {
    return <p>Загрузка списка заявок...</p>;
  }

  if (status === "failed") {
    return <p className="error-message">Ошибка: {error}</p>;
  }

  return (
    <div className="applications-tab">
      <table className="applications-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Почта</th>
            <th>Телефон</th>
            <th>Город</th>
            <th>Адрес</th>
            <th>Название отеля</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.fullName}</td>
              <td>{app.email}</td>
              <td>{app.phoneNumber}</td>
              <td>{app.city}</td>
              <td>{app.address}</td>
              <td>{app.hotelName}</td>
              <td>
                <div className="actions">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="action-icon accept-icon"
                    title="Принять"
                    onClick={() => onAccept(app.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="action-icon reject-icon"
                    title="Отклонить"
                    onClick={() => onReject(app.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTab;
