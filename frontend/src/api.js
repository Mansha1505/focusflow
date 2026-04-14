import axios from "axios";

const API = axios.create({
  baseURL: "https://focusflow-backend-olwq.onrender.com/api",
});

export default API;