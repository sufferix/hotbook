import React, { useState } from "react";
import Tabs from "../../components/admin_account/tabs";
import UsersTab from "../../components/admin_account/users_tab";
import ApplicationsTab from "../../components/admin_account/applications_tab";
import "./admin_dashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Анзор",
      surname: "Магомедов",
      email: "anzor-vovan@yandex.ru",
      role: "Владелец отеля",
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Арнольд",
      surname: "Деминцев",
      email: "hey_arnold@gmail.com",
      phone: "+7-918-934-74-29",
      hotelName: "Как дома",
      hotelAddress: "Санкт-Петербург, Большая Морская, 67",
    },
  ]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleBlockUser = (id) => {
    console.log(`User with id ${id} has been blocked.`);
  };

  const handleAcceptApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleRejectApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет</h1>
      </header>
      <div className="profile-section">
        <div>
          <p className="admin-name">Нори Киселев</p>
          <p className="admin-role">администратор</p>
        </div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
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

