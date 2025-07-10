import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Family_Join.css";

function Family_Join() {
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkFamilyCode = async (code) => {
    const res = await axios.get(`https://familog-be.onrender.com/families/${code}/`);
    console.log("응답 데이터:", res.data);
    if (res.data && res.data.code) {
      return {
        exists: true,
        name: res.data.name,
        code: res.data.code,
        seeds: res.data.seeds,
      };
    }
    return { exists: false };
  };

  const joinFamily = async (code) => {
    const token = localStorage.getItem("access_token");
    return await axios.post(
      `https://familog-be.onrender.com/families/${code}/join/`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const handleSubmit = async () => {
    const code = inputCode.trim();
    if (!code || code === "undefined") {
      setError("가족 코드를 입력해주세요.");
      return;
    }

    try {
      const check = await checkFamilyCode(code);
      if (!check.exists) {
        setError("존재하지 않는 가족 코드입니다.");
        return;
      }

      await joinFamily(code);

      // ✅ 키 통일
      localStorage.setItem("code", check.code);
      localStorage.setItem("familyName", check.name);
      localStorage.setItem("seeds", check.seeds);

      setError("잠시만 기다려주세요... 홈으로 이동 중입니다.");

      // ✅ 5초 뒤 홈으로 이동
      setTimeout(() => {
        navigate("/home", { state: { code: check.code } });
      }, 500);
    } catch (err) {
      console.error("가족 참여 실패:", err);
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
