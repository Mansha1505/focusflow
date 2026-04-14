import axios from "axios";

const API = axios.create({
  baseURL: "https://focusflow-backend-5tcg.onrender.com/api",
});

export default API;