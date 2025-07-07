import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Family_Join.css";

function Family_Join() {
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMessage("로그인이 필요합니다.");
      return;
    }

    try {
      const check = await checkFamilyCode(code);

      if (!check.exists) {
        setMessage("존재하지 않는 가족 코드입니다.");
        return;
      }

      await joinFamily({ code, userId });
      localStorage.setItem("familyCode", code);
      localStorage.setItem("familyName", check.name);
      navigate("/home");
    } catch (err) {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
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