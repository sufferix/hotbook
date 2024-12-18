import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "../../components/admin_account/tabs";
import UsersTab from "../../components/admin_account/users_tab";
import ApplicationsTab from "../../components/admin_account/applications_tab";
import "./admin_dashboard.css";

axios.defaults.baseURL = "https://your-api-url.com";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data.userList || []);
    } catch (error) {
      setErrorMessage("Ошибка загрузки пользователей");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      loadUsers();
    } catch (error) {
      setErrorMessage("Ошибка удаления пользователя");
    }
  };

  const handleBlockUser = async (id, enable) => {
    try {
      await axios.put(`/users/${id}/block?enable=${enable}`);
      loadUsers();
    } catch (error) {
      setErrorMessage("Ошибка блокировки пользователя");
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет администратора</h1>
      </header>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        {activeTab === "users" && (
          <UsersTab
            users={users}
            onDelete={handleDeleteUser}
            onBlock={(id) => handleBlockUser(id, false)}
            onUnblock={(id) => handleBlockUser(id, true)}
          />
        )}
        {activeTab === "applications" && (
          <ApplicationsTab
            applications={applications}
            onAccept={(id) => console.log(`Application ${id} accepted`)}
            onReject={(id) => console.log(`Application ${id} rejected`)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;



