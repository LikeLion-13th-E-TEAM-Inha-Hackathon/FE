import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import '../styles/Intro.css'

function Intro(){
    const navigate = useNavigate()

    return(
      <div className = "intro-background">
        <div className = "intro-header">
            <img src ={logo} alt="logo" className="intro-logo"/>
            <p className="intro-explanation">우리가 가까워지는 시간. <br></br>
              지금 패밀로그와 함께 행복한 시간을 만드세요!
            </p>
        </div>
        <div className="intro-buttons">
            <button onClick={()=>navigate('/login')} className="intro-login">로그인</button>
            <button onClick={()=>navigate('/SignUp')} className="intro-signup">회원가입</button>
        </div>
        <div className="intro-bottom">
          <p>© 2025 Team FamilEE</p>
        </div>
      </div>

    )


}

export default Intro;