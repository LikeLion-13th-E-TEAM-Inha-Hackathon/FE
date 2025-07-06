import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pro from "../assets/pro.png";
import "../styles/Profile.css";

function Profile() {
const navigate = useNavigate();

  const user = {
    role: "딸",
    name: "소소소",
    email: "aaa@gmail.com",
    family: "ㅇㅇ",
  };

  const members = [
    { role: "아빠", name: "소소소", email: "Aaa13@gmail.com" },
    { role: "엄마", name: "ㅂㅂㅂ", email: "Abx3@gmail.com" },
  ];

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleDelete = () => {
    if (window.confirm("정말 회원 탈퇴 하시겠습니까?")) {
      // 여기에 회원 탈퇴 요청 (회원 정보 삭제) API 추가 가능
      localStorage.clear();
      navigate("/");
    }
  };

  const handleCopyCode = () => {
  navigator.clipboard.writeText(familyCode).then(() => {
    alert("가족 코드가 복사되었습니다!");
  }).catch((err) => {
    alert("복사에 실패했습니다.");
    console.error(err);
  });
};


  return (
    <div className="profile-wrapper">
      <div className="profile-left">
        <img src={pro} alt="profile-user" className="profile-user" />
        <div className="profile-info">
          <strong>{user.family}가족 {user.name}님</strong>
          <p>{user.email}</p>
        </div>

        <button onClick={handleLogout} className="profile-btn1">로그아웃</button>
        <button onClick={handleDelete} className="profile-btn2">회원 탈퇴</button>
      </div>

      <div className="profile-right">
        <div className="profile-code">
          <span>{user.family} 가족</span>
          <button onClick={handleCopyCode} className="profile-copy">가족 코드 복사</button>
        </div>
        <hr className="profile-divider" />

        {members.map((m, i) => (
          <div className="profile-members" key={i}>
            <img src={pro} alt="profile-member" className="profile-member" />
            <div className="profile-info">
              <strong>{m.role} {m.name}님</strong>
              <p>{m.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile