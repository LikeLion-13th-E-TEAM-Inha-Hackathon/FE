const BASE_URL = "https://familog-be.onrender.com";


// 가족 포인트 조회
export async function getFamilyPoints(code) {
  const res = await fetch(`${BASE_URL}/families/${code}`);
  if (!res.ok) throw new Error("가족 포인트 조회 실패");

  const data = await res.json();
  if (data.length === 0) throw new Error("해당 가족 코드 포인트 데이터 없음");

  return data[0]; // { familyCode, points, id }
}

// 가족 포인트 추가 (amount 만큼 증가)
export async function addFamilyPoints(code, userId, amount) {
  const family = await getFamilyPoints(code);
  const updatedPoints = (family.points || 0) + amount;

  const res = await fetch(`${BASE_URL}/questions/${userId}/answers`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points: updatedPoints }),
  });

  if (!res.ok) throw new Error("가족 포인트 업데이트 실패");
  return await res.json();
}

// 가족 포인트 차감 (amount 만큼 감소)
export async function deductFamilyPoints(code, amount) {
  const family = await getFamilyPoints(code);
  const updatedPoints = Math.max((family.points || 0) - amount, 0);

  const res = await fetch(`${BASE_URL}/familes/${code}/plant/water/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points: updatedPoints }),
  });

  if (!res.ok) throw new Error("가족 포인트 차감 실패");
  return await res.json();
}

