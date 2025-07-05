import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Select() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname") || "사용자";

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">👋 어서오세요, {nickname} 님!</h2>
        <p className="login-message">무엇을 하시겠어요?</p>
        <div className="login-action">
          <button className="login-button" onClick={() => navigate("/family_create")}>가족 생성</button>
          <button className="login-button" onClick={() => navigate("/family_join")}>가족 참여</button>
        </div>
      </div>
    </div>
  );
}

export default Select;