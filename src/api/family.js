import axios from "axios";

const BASE_URL = "https://familog-be.onrender.com";

export const createFamily = async ({ name, code, plant, role, userId }) => {
  try {
    const response = await axios.post("/families", {
      name,
      code,
      plant,
      role,
      userId
    });
    return response.data; // 응답 예: { familyId: 1, code: "123456" }
  } catch (error) {
    throw error;
  }
};

export const checkFamilyCode = async (code) => {
  try {
    const res = await axios.get(`/families/code/${code}`);
    return res.data; // { exists: true/false, name: "우리 가족" }
  } catch (err) {
    throw err;
  }
};

export const joinFamily = async ({ code, userId }) => {
  try {
    const res = await axios.post(`/families/join`, {
      code,
      userId
    });
    return res.data; // 예: { success: true }
  } catch (err) {
    throw err;
  }
};
