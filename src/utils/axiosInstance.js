import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create axios instance with better error handling
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`API Error (${status}):`, data);

      if (status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      } else if (status === 404) {
        console.error("Resource not found. Check your API endpoint.");
      } else if (status === 500) {
        console.error("Server error. Please try again later.");
      }

      // Create a more descriptive error message
      const errorMessage =
        data?.message || `Error ${status}: ${data?.error || "Unknown error"}`;
      error.message = errorMessage;
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please check your network connection.");
      error.message = "Request timeout. Please try again.";
    } else if (error.code === "ERR_NETWORK") {
      console.error("Network error. API server might be down.");
      error.message = "Network error. Please check your connection.";
    } else {
      console.error("Unexpected error:", error);
      error.message = error.message || "An unexpected error occurred";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
