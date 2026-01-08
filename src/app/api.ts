'use client'
import axios from "axios";

export const baseConfig = {
  baseURL: 'https://rihanna-preacquisitive-eleanore.ngrok-free.dev',
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const createAxios = () => axios.create(baseConfig);

const api = createAxios();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirect to login");
      //window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
