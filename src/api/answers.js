const BASE_URL = "https://familog-be.onrender.com";

const token = localStorage.getItem("access_token"); // 로그인 시 저장된 토큰

// 답변 가져오기
export async function getAnswers(questionId) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/answers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("답변 가져오기 실패");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// 답변 작성하기
export async function postAnswer(questionId, content, nickname, memberId) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ 토큰 추가
    },
    body: JSON.stringify({
      questionId,
      content,
      nickname,
      memberId,
    }),
  });

  if (!res.ok) {
    throw new Error("답변 저장 실패");
  }

  return await res.json();
}

