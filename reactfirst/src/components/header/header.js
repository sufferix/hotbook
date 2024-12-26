import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import hotbookLogo from "../../hotbook.svg";
import "./header.css";

function Header({ isAuthenticated, onUserIconClick }) {
  const role = localStorage.getItem("role");

  const getDashboardPath = () => {
    switch (role) {
      case "USER":
        return "/client-dashboard";
      case "HOTELIER":
        return "/owner-dashboard";
      case "ADMIN":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={hotbookLogo} alt="HotBook Logo" className="logo" />
        </Link>
      </div>

      {isAuthenticated ? (
        <Link to={getDashboardPath()} className="user-icon">
          <FaUserCircle />
        </Link>
      ) : (
        <FaUserCircle className="user-icon" onClick={onUserIconClick} />
      )}
    </header>
  );
}

export default Header;
