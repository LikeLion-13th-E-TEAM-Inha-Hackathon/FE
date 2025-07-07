import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Family_Create.css";


function Family_Create() {
  const [selectedRole, setSelectedRole] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [message, setMessage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const roles = [
    "엄마", "아빠", "딸", "아들",
    "할머니", "할아버지", "손녀", "손자"
  ];

  const plants = ["방울 토마토", "해바라기", "딸기"];

  const handleSubmit = () => {
    if (!selectedRole || !familyName || !selectedPlant) {
      setMessage("모든 항목을 입력해주세요.");
      setShowCode(false);
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    setGeneratedCode(code);
    setShowCode(true);
    setMessage("");
  };

  return (
    <div className="family-wrapper">
      <div className="family-container">
        <h2 className="family-title">👨‍👩‍👧‍👦 가족 생성</h2>

        <p className="family-label">1. 당신은 어떤 구성원인가요?</p>
        <div className="family-grid">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`family-btn ${selectedRole === role ? "selected" : ""}`}
            >
              {role}
            </button>
          ))}
        </div>

        <p className="family-label">2. 우리 가족의 이름을 정해주세요</p>
        <input
          type="text"
          className="family-input"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />

        <p className="family-label">3. 화분을 선택해주세요</p>
        <div className="family-row">
          {plants.map((plant) => (
            <button
              key={plant}
              onClick={() => setSelectedPlant(plant)}
              className={`family-btn ${selectedPlant === plant ? "selected" : ""}`}
            >
              {plant}
            </button>
          ))}
        </div>

        <button className="family-submit" onClick={handleSubmit}>
          완료
        </button>

        {message && <p className="family-error">{message}</p>}

        {showCode && (
          <p className="family-code">🎉 가족 코드: <strong>{generatedCode}</strong></p>
        )}
      </div>
    </div>
  );
}

export default Family_Create;