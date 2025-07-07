import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../api/user";
import pro from "../assets/pro.png";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyCode, setFamilyCode] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetchUserInfo(userId)
      .then((data) => {
        setUser(data.user);
        setFamilyMembers(data.members);
        setFamilyCode(data.familyCode);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleLeave = () => {
    if (window.confirm("정말 회원 탈퇴 하시겠습니까?")) {
      localStorage.clear();
      // 회원 정보 삭제
      navigate("/");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(familyCode);
    alert("가족 코드가 복사되었습니다!");
  };

  if (!user) return <div className="profile-loading">불러오는 중...</div>;


  return (
    <div className="profile-wrapper">
      <div className="profile-left">
        <img src={pro} alt="profile-user" className="profile-user" />
        <div className="profile-info">
          <strong>{user.family}가족 {user.name}님</strong>
          <p>{user.email}</p>
        </div>

        <button onClick={handleLogout} className="profile-btn1">로그아웃</button>
        <button onClick={handleLeave} className="profile-btn2">회원 탈퇴</button>
      </div>

      <div className="profile-right">
        <div className="profile-code">
          <span>{user.family} 가족</span>
          <button onClick={handleCopy} className="profile-copy">가족 코드 복사</button>
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