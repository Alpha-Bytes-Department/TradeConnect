"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ---------------- Request Interceptor ---------------- */

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log('-------------------------------------------------------------------',config)
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
    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirect to login");
      // window.location.href = '/login';
    }

    return Promise.reject({
      status: error.response?.status,
      message:
        error.response?.data?.message || "Network error. Please try again.",
    });
  }
);

export default api;
