"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  
});

/* ---------------- Request Interceptor ---------------- */

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

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
  (response) => response,
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
