import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../api/user";
import pro from "../assets/pro.png";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
  const userId = localStorage.getItem("userId");

  if (!userId) return;

  fetchUserInfo(userId)
    .then((data) => {
      if (Array.isArray(data.members)) {
        setMembers(data.members);
      }

      setUser({
        nickname: data.nickname,
        email: data.email,
        familyName: data.familyName,
      });

      setCode(data.code); // 또는 data.code 생략 가능
    })
    .catch((err) => console.error("유저 정보 불러오기 실패:", err));
}, []);


  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
      navigate("/");
    }
  };

  const handleLeave = async () => {
    if (!window.confirm("정말 회원 탈퇴 하시겠습니까?")) return;

    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`https://familog-be.onrender.com/users/${userId}/`);

      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
      navigate("/");
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("가족 코드가 복사되었습니다!");
  };

  const handleOut = async (memberId) => {
    const code = localStorage.getItem("code");

    if (!window.confirm("정말 이 구성원을 가족에서 추방하시겠습니까?")) return;

    try {
      await axios.delete(
        `https://familog-be.onrender.com/families/${code}/members/${memberId}/`
      );
      alert("구성원을 성공적으로 추방했습니다!");
      window.location.reload(); // 새로고침
    } catch (err) {
      console.error("가족 추방 실패:", err);
      alert("구성원 추방에 실패했습니다.");
    }
  };

  if (!user) return <div className="profile-loading">불러오는 중...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-left">
        <img src={pro} alt="profile-user" className="profile-user" />
        <div className="profile-info">
          <strong>{user.familyName} 가족 {user.nickname}님</strong>
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

        {Array.isArray(members) && members.length > 0 ? (
          members.map((m, i) => (
            <div className="profile-members" key={i}>
              <img src={pro} alt="profile-member" className="profile-member" />
              <div className="profile-info">
                <strong>{m.role} {m.nickname}님</strong>
                <p>멤버 ID: {m.memberId}</p>
                <button
                  onClick={() => handleOut(m.memberId)}
                  className="profile-out"
                >
                  가족 추방
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="profile-loading">가족 구성원이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;