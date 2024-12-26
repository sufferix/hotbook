import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProfile, loadAllUsers, removeUser, toggleUserBlock } from "../../redux/slices/userSlice";
import { loadApplications, handleApplication } from "../../redux/slices/applicationsSlice";
import Tabs from "../../components/admin_account/tabs";
import UsersTab from "../../components/admin_account/users_tab";
import ApplicationsTab from "../../components/admin_account/applications_tab";
import LogoutButton from "../../components/account/logout_button";
import "./admin_dashboard.css";
import { translateRole } from "../../utils/roleTranslations";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status: profileStatus } = useSelector((state) => state.user);
  const { users, status: userStatus, error: userError } = useSelector((state) => state.user);
  const { applications, status: appStatus, error: appError } = useSelector((state) => state.applications);

  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(loadUserProfile());
    }
  }, [profileStatus, dispatch]);

  useEffect(() => {
    if (profileStatus === "succeeded" && profile) {
      const role = profile.role;
      switch (role) {
        case "ADMIN":
          break;
        case "HOTELIER":
          navigate("/owner-dashboard");
          break;
        case "USER":
          navigate("/client-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [profileStatus, profile, navigate]);
  
  useEffect(() => {
    if (activeTab === "users" && userStatus === "idle") {
      dispatch(loadAllUsers());
    } else if (activeTab === "applications" && appStatus === "idle") {
      dispatch(loadApplications());
    }
  }, [activeTab, dispatch, userStatus, appStatus]);

  const handleDeleteUser = (id) => {
    dispatch(removeUser(id));
  };

  const handleBlockUser = (id, enable) => {
    dispatch(toggleUserBlock({ userId: id, enable }));
  };

  const handleAcceptApplication = (id) => {
    dispatch(handleApplication({ applicationId: id, accept: true })).then(() => {
        dispatch(loadAllUsers());
    });
};

  const handleRejectApplication = (id) => {
    dispatch(handleApplication({ applicationId: id, accept: false }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Личный кабинет</h1>
      </header>
      <div className="profile-section">
        <div>
          <p className="admin-name">
          <p className="admin-name">
            {(() => {
              const nameParts = [profile?.name, profile?.surname]
                .filter((part) => part && part.trim().toLowerCase() !== "null");
              return nameParts.length > 0 ? nameParts.join(" ") : "Имя не указано";
            })()}
          </p>
          </p>
          <p className="admin-role">{translateRole(profile?.role)}</p>
          <LogoutButton onLogout={handleLogout} />
        </div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">
        {activeTab === "users" && (
          <UsersTab
            users={users}
            status={userStatus}
            error={userError}
            onDelete={handleDeleteUser}
            onBlock={handleBlockUser}
          />
        )}
        {activeTab === "applications" && (
          <ApplicationsTab
            applications={applications}
            status={appStatus}
            error={appError}
            onAccept={handleAcceptApplication}
            onReject={handleRejectApplication}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
