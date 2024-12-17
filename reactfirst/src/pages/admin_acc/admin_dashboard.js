import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "../../components/admin_account/tabs";
import UsersTab from "../../components/admin_account/users_tab";
import ApplicationsTab from "../../components/admin_account/applications_tab";
import LogoutButton from "../../components/account/logout_button";
import "./admin_dashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users"); // Текущая вкладка
  const [users, setUsers] = useState([]); // Список пользователей
  const [applications, setApplications] = useState([]); // Список заявок
  const [error, setError] = useState(""); // Ошибки при загрузке

  // Получение списка пользователей и заявок
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получение списка пользователей
        const usersResponse = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(usersResponse.data.userList || []);

        // Получение списка заявок
        const applicationsResponse = await axios.get("/api/applications", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setApplications(applicationsResponse.data.applications || []);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      }
    };

    fetchData();
  }, []);

  // Удаление пользователя
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(users.filter((user) => user.id !== userId));
      alert("Пользователь успешно удален.");
    } catch (err) {
      console.error("Ошибка при удалении пользователя:", err);
      alert("Не удалось удалить пользователя.");
    }
  };

  // Блокировка пользователя
  const handleBlockUser = async (userId) => {
    try {
      await axios.put(
        `/api/users/${userId}/block`,
        { enable: false }, // Блокировка пользователя
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Пользователь успешно заблокирован.");
    } catch (err) {
      console.error("Ошибка при блокировке пользователя:", err);
      alert("Не удалось заблокировать пользователя.");
    }
  };

  // Принятие заявки
  const handleAcceptApplication = async (applicationId) => {
    try {
      await axios.put(
        `/api/applications/${applicationId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setApplications(applications.filter((app) => app.id !== applicationId));
      alert("Заявка успешно принята.");
    } catch (err) {
      console.error("Ошибка при принятии заявки:", err);
      alert("Не удалось принять заявку.");
    }
  };

  // Отклонение заявки
  const handleRejectApplication = async (applicationId) => {
    try {
      await axios.put(
        `/api/applications/${applicationId}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setApplications(applications.filter((app) => app.id !== applicationId));
      alert("Заявка успешно отклонена.");
    } catch (err) {
      console.error("Ошибка при отклонении заявки:", err);
      alert("Не удалось отклонить заявку.");
    }
  };

  // Выход из системы
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет администратора</h1>
        <LogoutButton onLogout={handleLogout} />
      </header>

      <div className="profile-section">
        <p className="admin-name">Администратор</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Вкладки */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Содержимое вкладок */}
      <div className="tab-content">
        {activeTab === "users" && (
          <UsersTab
            users={users}
            onDelete={handleDeleteUser}
            onBlock={handleBlockUser}
          />
        )}
        {activeTab === "applications" && (
          <ApplicationsTab
            applications={applications}
            onAccept={handleAcceptApplication}
            onReject={handleRejectApplication}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


