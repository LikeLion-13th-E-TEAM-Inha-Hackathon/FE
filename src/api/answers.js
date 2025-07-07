import axios from "axios";

const BASE_URL = "https://familog-be.onrender.com";

// 답변 가져오기: questionId 기준
export async function getAnswers(questionId) {
  const res = await fetch(`${BASE_URL}/answers?questionId=${questionId}`);
  if (!res.ok) {
    throw new Error("답변 가져오기 실패");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : []; // 반드시 배열 반환
}

// 답변 작성하기
export async function postAnswer(questionId, content, nickname, memberId) {
  const res = await fetch(`${BASE_URL}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
