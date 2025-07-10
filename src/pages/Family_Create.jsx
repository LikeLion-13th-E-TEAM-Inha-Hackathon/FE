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
  const [isSubmitting, setIsSubmitting] = useState(false);  // ✅ 추가
  const navigate = useNavigate();

  const roles = ["엄마", "아빠", "딸", "아들", "할머니", "할아버지", "손녀", "손자"];
  const plants = ["tomato", "sunflower", "strawberry"];

  const createFamily = async ({ name, code, plant, role, userId }) => {
    const res = await axios.post("https://familog-be.onrender.com/families/", {
      name,
      code,
      plant,
      role,
      user: userId,
    });
    return res.data;
  };

  const goHome = () => {
    navigate("/home");
  };

  const handleSubmit = async () => {
    if (!selectedRole || !familyName || !selectedPlant) {
      setMessage("모든 항목을 입력해주세요.");
      setShowCode(false);
      return;
    }

    setIsSubmitting(true); // ✅ 중복 방지
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const userId = localStorage.getItem("userId");

      // ✅ 2초 딜레이 추가
      await new Promise((res) => setTimeout(res, 2000));

      const res = await createFamily({
        name: familyName,
        code,
        plant: selectedPlant,
        role: selectedRole,
        userId,
      });

      localStorage.setItem("plant", res.plant);
      localStorage.setItem("role", res.role);
      localStorage.setItem("familyCode", res.code);
      localStorage.setItem("familyName", familyName);

      setGeneratedCode(res.code);
      setShowCode(true);
      setMessage("");
    } catch (err) {
      console.error("가족 생성 실패:", err);
      setMessage("가족 생성에 실패했습니다. 이미 존재하거나 오류가 발생했습니다.");
      setShowCode(false);
    } finally {
      setIsSubmitting(false); // ✅ 완료 후 재활성화
    }
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

        {!showCode && (
          <button className="family-submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "생성 중..." : "완료"}
          </button>
        )}

        {message && <p className="family-error">{message}</p>}

        {showCode && (
          <p className="family-code">
            🎉 가족 코드: <strong>{generatedCode}</strong>
          </p>
        )}

        <button className="family-home" onClick={goHome}>
          홈으로
        </button>
      </div>
    </div>
  );
}

export default Family_Create;