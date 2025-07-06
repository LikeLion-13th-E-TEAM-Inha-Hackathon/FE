import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-btn">
        <button onClick={() => navigate("/question")} className="footer-btn1">오늘의 질문</button>
        <button onClick={() => navigate("/drawer")} className="footer-btn2">질문 서랍</button>
      </div>
      <p className="footer-text">© 2025 FamilEE. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
