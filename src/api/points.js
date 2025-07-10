import axios from "axios";

const BASE_URL = "https://familog-be.onrender.com"; // ✅ 오타 수정

// 가족 포인트 조회
export async function getFamilyPoints(code) {
  try {
    const res = await axios.get(`${BASE_URL}/families/${code}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const data = res.data;
    if (!data || typeof data.seeds !== "number") {
      throw new Error("해당 가족의 포인트(seeds)를 찾을 수 없습니다");
    }

    return data;
  } catch (err) {
    console.error("가족 포인트 조회 실패:", err);
    throw new Error("가족 포인트 조회 실패");
  }
}

// 가족 포인트 추가 (답변 후)
export async function addFamilyPoints(code, questionId) {
  try {
    const res = await fetch(`${BASE_URL}/question/${questionId}/answers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("가족 포인트 증가 실패");
    }

    return await res.json(); // { seeds: ... }
  } catch (err) {
    console.error("포인트 추가 실패:", err);
    throw err;
  }
}

// 가족 포인트 차감 + 물주기
export async function deductFamilyPoints(code) {
  try {
    const res = await fetch(`${BASE_URL}/families/${code}/plant/water/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error("물주기 실패");

    return await res.json(); // { growLevel, seeds, wateringCount }
  } catch (err) {
    console.error("물주기 실패:", err);
    throw err;
  }
}

