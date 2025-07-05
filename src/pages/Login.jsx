import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [message,setMessage]=useState("");
  const navigate = useNavigate();

  const postUser = async () => {
    try {
    const res  = await axios.post("https://reqres.in/api/login", {
      email : email,
      password : password,
    }, {
      headers: {
        "x-api-key": "reqres-free-v1"}  // 인증용 API 키
     });

    localStorage.setItem("token", res.data.token); 
    localStorage.setItem("email", email); // 응답에 성공했을 시, token과 email을 localstorage에 저장
    navigate("/userlist"); // userlist로 이동
    
  } catch (error) { // 실패했을 시에
    const errMsg = error.response?.data?.error || "User not found";
      setMessage(errMsg); // 응답 객체 안의 data.error 에 접근하여 그 내용을 에러 메시지로 표시
  }
  };

    return(
      <form onSubmit={handleLogin} className="login-container">
        <h2>🔐 로그인</h2>
        <input required value ={email} onChange={handleEmail} placeholder="이메일 입력"/>
        <input required value={password} onChange={handlePW} placeholder="비밀번호 입력" type="password"/>
        <button type="submit" onClick={handleLogin}>로그인</button>
        {message && <p className="message">{message}</p>}
      </form>
    )


}

export default Login;
