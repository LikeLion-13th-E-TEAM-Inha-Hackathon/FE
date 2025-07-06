import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import pro from "../assets/pro.png";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();
  const familyName = localStorage.getItem("familyName") || "우리";
  const nickname = localStorage.getItem("nickname") || "사용자";

  return (
    <header className="header-container">
      <div className="header-left" onClick={() => navigate("/home")}> 
        <img src={logo1} alt="FamiLog Logo" className="header-logo1" />
        <img src={logo2} alt="FamiLog Logo" className="header-logo2" />
      </div>

      <div className="header-right" onClick={() => navigate("/profile")}> 
        <img src={pro} alt="profile-photo" className="header-pro" />
        <span className="header-username">{familyName} 가족 {nickname}님</span>
      </div>
    </header>
  );
}

export default Header;