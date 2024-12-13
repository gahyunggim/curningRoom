import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 500,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
