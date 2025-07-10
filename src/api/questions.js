import axios from "axios";

const BASE_URL = "https://familog-be.onrender.com";
const DEFAULT_QUESTION = "오늘 가족 중 누가 가장 멋져 보였나요?";

export async function getTodayQuestion(code) {
  try {
    const res = await axios.get(`${BASE_URL}/families/${code}/questions/today`);
    const data = res.data;

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    } else {
      // ✅ 질문이 없으면 새 질문 생성
      return await createQuestion({ code, content: DEFAULT_QUESTION });
    }
  } catch (err) {
    throw new Error("질문 불러오기 실패");
  }
}

// 질문 생성 함수
export async function createQuestion({ code, content }) {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const res = await axios.get(`${BASE_URL}/families/${code}/questions/today`, {
      code,
      content,
      date: today,
    });
    return res.data; // ✅ 생성된 질문 객체 (id 포함)
  } catch (err) {
    throw new Error("질문 생성 실패");
  }
}


// 전체 질문 가져오기 (디버깅용)
export async function getAllQuestions(code) {
  try {
    const res = await axios.get(`${BASE_URL}/families/${code}/questions/`);
    return res.data;
  } catch (err) {
    throw new Error("전체 질문 불러오기 실패");
  }
}


