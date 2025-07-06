import axios from "axios";

export const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data; // { user, members, familyCode }
  } catch (error) {
    console.error("유저 정보 불러오기 실패", error);
    throw error;
  }
};