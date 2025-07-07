import axios from "axios";

const BASE_URL = "https://familog-be.onrender.com";

// 질문 자동 생성 시 사용할 기본 질문
const DEFAULT_QUESTION = "오늘 가족 중 누가 가장 멋져 보였나요?";

//  오늘의 질문 가져오기 (없으면 자동 생성)
export async function getTodayQuestion(familyCode) {
  const today = new Date().toISOString().slice(0, 10);

  const res = await fetch(`${BASE_URL}/questions?familyCode=family001&date=${today}`);
  console.log(res.data);
  if (!res.ok) throw new Error("질문 불러오기 실패");

  const data = await res.json();

  if (data.length > 0) {
    return data[0];
  } else {
    // 없으면 자동 생성
    return await createQuestion({ familyCode, content: DEFAULT_QUESTION });
  }
}

// 질문 생성
export async function createQuestion({ familyCode, content }) {
  const today = new Date().toISOString().slice(0, 10);

  const res = await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      familyCode,
      content,
      date: today
    }),
  });

  if (!res.ok) throw new Error("질문 생성 실패");

  return await res.json();
}

//전체 질문 가져오기 (디버깅용)
export async function getAllQuestions() {
  const res = await fetch(`${BASE_URL}/questions`);
  if (!res.ok) throw new Error("전체 질문 불러오기 실패");
  return await res.json();
}

