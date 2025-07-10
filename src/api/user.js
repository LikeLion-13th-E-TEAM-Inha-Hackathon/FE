import axios from "axios";


const BASE_URL = "https://familog-be.onrender.com";

export const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/`);
    const data = response.data;

    // 응답 데이터 구조에 맞게 접근!
    // localStorage.setItem("code", data.code);
    //localStorage.setItem("familyName", data.familyName); // ✅ 예: "강가네"

    return data; // { nickname, email, code, familyname, members: [...] }
  } catch (error) {
    console.error("유저 정보 불러오기 실패", error);
    throw error;
  }
};
