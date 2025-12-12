import axios from "axios";

const SERVER_URL =
  (import.meta.env.VITE_SERVER_URL as string) || "http://localhost:5001";

const api = axios.create({
  baseURL: SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
