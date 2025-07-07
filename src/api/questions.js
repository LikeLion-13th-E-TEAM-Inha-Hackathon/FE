import axios from "axios";

const BASE_URL = "https://familog-be.onrender.com";

// 질문 자동 생성 시 사용할 기본 질문
const DEFAULT_QUESTION = "오늘 가족 중 누가 가장 멋져 보였나요?";

// 오늘의 질문 가져오기 (없으면 자동 생성)
export async function getTodayQuestion(code) {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const res = await axios.get(`${BASE_URL}/families/${code}/questions/date=${today}`);
    const data = res.data;

    if (data.length > 0) {
      return data[0];
    } else {
      // 없으면 자동 생성
      return await createQuestion({ code, content: DEFAULT_QUESTION });
    }
  } catch (err) {
    throw new Error("질문 불러오기 실패");
  }
}

// 질문 생성
export async function createQuestion({ code, content }) {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const res = await axios.post(`${BASE_URL}/families/${code}/questions/today`, {
      code,
      content,
      date: today,
    });
    return res.data;
  } catch (err) {
    throw new Error("질문 생성 실패");
  }
}

// 전체 질문 가져오기 (디버깅용)
export async function getAllQuestions(code) {
  try {
    const res = await axios.get(`${BASE_URL}/families/${code}/questions`);
    return res.data;
  } catch (err) {
    throw new Error("전체 질문 불러오기 실패");
  }
}


