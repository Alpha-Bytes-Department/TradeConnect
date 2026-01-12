"use client";

import axios from "axios";

const api = axios.create({
  baseURL:
    "https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/",
  timeout: 15000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

/* ---------------- Request Interceptor ---------------- */

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;

      }
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

/* ---------------- Response Interceptor ---------------- */

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject({ canceled: true });
    }

    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirect to login");
    }

    return Promise.reject({
      status: error.response?.status ?? 0,
      message:
        error.response?.data?.message ||
        error.message ||
        "Network error. Please try again.",
    });
  }
);


export default api;
