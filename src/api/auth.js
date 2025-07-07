import axios from "axios";

const BASE_URL = "https://familog-be.onrender.com";

export async function signUp(email, password, nickname) {
  const res = await axios.post(`${BASE_URL}/users/signup`, {
    email,
    password,
    nickname
  });
  return res.data;
}

export async function login(email, password) {
  const res = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password
  });
  return res.data;
}
