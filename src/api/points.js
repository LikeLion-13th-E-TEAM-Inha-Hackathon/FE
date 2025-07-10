const BASE_URL = "https:/familog-be.onrender.com";

// 가족 포인트 조회
export async function getFamilyPoints(code) {
  const res = await fetch(`${BASE_URL}/families/${code}/`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  });

  if (!res.ok) throw new Error("가족 포인트 조회 실패");

  const data = await res.json();
  if (!data || typeof data.seeds !== "number") {
    throw new Error("해당 가족의 포인트(seeds)를 찾을 수 없습니다");
  }

  return data;  // ✅ 이렇게 전체 객체 반환해야 함
}


// 가족 포인트 추가 (amount 만큼 증가) → (예: 질문답변 후)

// 서버가 내부적으로 +50 처리하도록 요청만 보냄
export async function addFamilyPoints(code,questionId) {
  const res = await fetch(`${BASE_URL}/question/${questionId}/answers`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("가족 포인트 증가 실패");
  }

  return await res.json(); // { seeds: 750 } 등 응답
}


// 가족 포인트 차감 + 물주기
export async function deductFamilyPoints(code) {
  const res = await fetch(`${BASE_URL}/families/${code}/plant/water/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
    body: JSON.stringify({}), // 물주기 요청은 빈 객체
  });

  if (!res.ok) throw new Error("물주기 실패");

  return await res.json();  // { growLevel, seeds, wateringCount }
}
