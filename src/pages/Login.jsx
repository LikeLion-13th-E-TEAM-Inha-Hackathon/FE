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
      return;}

    };


  return (
    <div className="login-background">
     <form onSubmit={handleLogin} className="login-container">
       <h2 className="login-title">🔐로그인</h2>
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
    </form>
    </div>
  );
}

export default Login;
