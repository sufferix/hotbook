import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === "users" ? "active" : ""}`}
        onClick={() => setActiveTab("users")}
      >
        Список пользователей
      </button>
      <button
        className={`tab-button ${activeTab === "applications" ? "active" : ""}`}
        onClick={() => setActiveTab("applications")}
      >
        Входящие анкеты
      </button>
    </div>
  );
};

export default Tabs;
