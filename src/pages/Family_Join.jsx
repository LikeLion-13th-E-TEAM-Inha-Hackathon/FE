import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Family_Join.css";

function Family_Join() {
    const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const savedCode = localStorage.getItem("familyCode");

    if (inputCode === savedCode) {
      navigate("/home");
    } else {
      setError("존재하지 않는 코드입니다. 다시 확인해주세요.");
    }
  };

  return (
    <div className="join-wrapper">
      <div className="join-container">
        <h2 className="join-title">👪 가족 참여</h2>
        <p className="join-label">가족 코드를 입력해주세요!</p>
        <input
          type="text"
          className="join-input"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button className="join-button" onClick={handleSubmit}>
          참여하기
        </button>
        {error && <p className="join-error">{error}</p>}
      </div>
    </div>
  );
}

export default Family_Join;