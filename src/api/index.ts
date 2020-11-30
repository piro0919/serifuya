import axios from "axios";

const api = axios.create({
  baseURL: "https://asia-northeast1-serifuya-1f5b4.cloudfunctions.net/api",
});

export default api;
