const BASE_URL = "https://familog-be.onrender.com";

// 답변 가져오기: questionId 기준
export async function getAnswers(questionId) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/answers`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("답변 가져오기 실패");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : []; // 반드시 배열 반환
}

// postAnswer 수정
export async function postAnswer(questionId, content) {
  const nickname = localStorage.getItem("nickname");
  const memberId = localStorage.getItem("userId");

  const res = await fetch(`${BASE_URL}/questions/${questionId}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      questionId,
      content,
      nickname,
      memberId,
    }),
  });

  if (!res.ok) throw new Error("답변 저장 실패");

  return await res.json();
}


