import axios from "axios";
const BASE = "https://familog-be.onrender.com";

export async function getPlantStatus(code) {
  const res = await axios.get(`${BASE}/families/${code}/plant/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return res.data; // { plantId, growLevel, wateringCount }
}