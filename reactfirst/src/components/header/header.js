import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import hotbookLogo from "../../hotbook.svg";
import "./header.css";

function Header({ onIconClick }) {
    return (
      <header className="header">
        {/* Логотип с ссылкой на главную страницу */}
        <div className="logo-container">
          <Link to="/">
            <img src={hotbookLogo} alt="HotBook Logo" className="logo" />
          </Link>
        </div>
  
        {/* Иконка пользователя */}
        <FaUserCircle className="user-icon" onClick={onIconClick} />
      </header>
    );
  }
  
  export default Header;