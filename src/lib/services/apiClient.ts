import axios from "axios";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create a custom axios instance for better control
const apiClient = axios.create({
  baseURL: LOCAL_API_URL,
});

// Set up axios interceptor to automatically include Authorization header
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      // Redirect to login or handle unauthorized access
      // if in page result not redirect to login
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/auth"
      ) {
        if (window.location.pathname !== "/result") {
          window.location.href = "/auth";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
