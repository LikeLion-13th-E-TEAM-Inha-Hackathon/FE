import axios from "axios";

const BASE_URL = "http://localhost:4000";

export async function signUp(email, password, nickname) {
  const res = await axios.post(`${BASE_URL}/auth/signup`, {
    email,
    password,
    nickname
  });
  return res.data;
}

export async function login(email, password) {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password
  });
  return res.data;
}

export async function checkEmail(email) {
  const res = await axios.post(`${BASE_URL}/auth/email-check`, {
    email
  });
  return res.data; // 예: { exists: true } 또는 { exists: false }
}

export async function checkPassword(password) {
  const res = await axios.post(`${BASE_URL}/auth/password-check`, {
    password
  });
  return res.data; // 예: { exists: true } 또는 { exists: false }
}