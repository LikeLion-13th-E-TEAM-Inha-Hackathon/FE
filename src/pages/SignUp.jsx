import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function SignUp() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

const handleSignUp = async () => {
  if (!nickname || !email || !password || !confirmPassword) {
    setMessage("모든 칸을 입력해주세요.");
    return;
  }

  if (password !== confirmPassword) {
    setMessage("비밀번호가 일치하지 않습니다.");
    return;
  }

    try {
      // 회원가입 요청
      const response = await axios.post("https://familog-be.onrender.com/users/signup/", {
        email,
        password,
        nickname
      });

      const data = response.data;

      localStorage.setItem("nickname", nickname);

      // 회원가입 성공 처리
      alert("회원가입 성공!");
      navigate("/login");

    } catch (err) {
      console.error("회원가입 실패:", err.response?.data || err.message);
      setMessage("회원가입 실패: 이미 존재하는 이메일이거나 서버 오류입니다.");
    }
  };


  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">👤 패밀로그 회원가입</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          className="login-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="login-input"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          className="login-input"
        />
        <button className="login-button" onClick={handleSignUp}>완료</button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;