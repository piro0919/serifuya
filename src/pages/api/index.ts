import axios from "axios";

const api = axios.create({
  baseURL: process.env.FIREBASE_BASE_URL,
});

export default api;
