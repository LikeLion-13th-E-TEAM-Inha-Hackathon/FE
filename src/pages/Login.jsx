import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

      try {
      const response = await axios.post("https://familog-be.onrender.com/users/login/", {
        email,
        password
      });

      const data = response.data;

      // 응답 형식에 따라 저장
      localStorage.setItem("token", data.token);    // 백엔드가 token을 준다고 가정
      localStorage.setItem("userId", data.userId);  // 또는 id 등

      if (data.code) {
        localStorage.setItem("familyCode", data.code);
        navigate("/home");
      } else {
        navigate("/select")
      }

    } catch (err) {
      console.error("로그인 오류:", err);
      setMessage("로그인 실패 : 이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };


  return (
    <div className="login-background">
     <form onSubmit={handleLogin} className="login-container">
       <h2 className="login-title">🔐 패밀로그 로그인</h2>
       <input
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="이메일 입력"
         className="login-input"
         required
       />
       <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="비밀번호 입력"
         className="login-input"
         required
       />
       <button type="submit" className="login-button">로그인</button>
       {message && <p className="login-message">{message}</p>}
       <p className="signup-link" onClick={() => navigate('/signup')}>아직 회원이 아니신가요? 회원가입 하기</p>
    </form>
    </div>
  );
}

export default Login;
