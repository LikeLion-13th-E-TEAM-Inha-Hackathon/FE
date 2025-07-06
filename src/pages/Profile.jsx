import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
const navigate = useNavigate();

  const user = {
    role: "딸",
    name: "소소소",
    email: "aaa@gmail.com",
    family: "ㅇㅇ가족",
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
      // 여기에 회원 탈퇴 요청 API 추가 가능
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Face-smile.svg/1024px-Face-smile.svg.png"
          alt="profile"
          className="profile-img"
        />
        <div className="profile-info">
          <strong>{user.family} {user.name}님</strong>
          <p>{user.email}</p>
        </div>

        <button onClick={handleLogout} className="profile-btn">로그아웃</button>
        <button onClick={handleDelete} className="profile-btn">회원 탈퇴</button>
      </div>

      <div className="profile-right">
        <div className="profile-code-header">
          <span>{user.family}</span>
          <button className="profile-copy">가족 코드 복사</button>
        </div>
        <hr className="profile-divider" />

        {members.map((m, i) => (
          <div className="profile-member" key={i}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Face-smile.svg/1024px-Face-smile.svg.png"
              alt="member"
              className="profile-img"
            />
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