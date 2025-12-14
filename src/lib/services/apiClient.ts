import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Validate API URL is configured
if (!LOCAL_API_URL) {
  console.error("NEXT_PUBLIC_API_URL is not configured");
}

// Request timeout (30 seconds)
const REQUEST_TIMEOUT = 30000;

// Create a custom axios instance for better control
const apiClient = axios.create({
  baseURL: LOCAL_API_URL,
  timeout: REQUEST_TIMEOUT,
  // Security: Only allow specific content types
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Security: Don't send credentials unless explicitly needed
  withCredentials: false,
});

// Request retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Track retry count per request
interface RetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

// Set up axios interceptor to automatically include Authorization header
apiClient.interceptors.request.use(
  (config: RetryConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // Security: Validate token format before sending
        if (token.length > 0 && token.length < 10000) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // Invalid token format, clear it
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and implement retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;
    
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Initialize retry count
    originalRequest._retryCount = originalRequest._retryCount || 0;

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear invalid token
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      // Redirect to login or handle unauthorized access
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/auth"
      ) {
        if (window.location.pathname !== "/result") {
          window.location.href = "/auth";
        }
      }
      return Promise.reject(error);
    }

    // Handle 429 Too Many Requests (rate limiting)
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAY * 2;
      
      if (originalRequest._retryCount < MAX_RETRIES) {
        originalRequest._retryCount++;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return apiClient(originalRequest);
      }
    }

    // Handle 5xx server errors with retry
    if (
      error.response?.status &&
      error.response.status >= 500 &&
      originalRequest._retryCount < MAX_RETRIES
    ) {
      originalRequest._retryCount++;
      await new Promise(resolve => 
        setTimeout(resolve, RETRY_DELAY * originalRequest._retryCount!)
      );
      return apiClient(originalRequest);
    }

    // Handle network errors with retry
    if (
      error.code === "ECONNABORTED" ||
      error.code === "ERR_NETWORK" ||
      !error.response
    ) {
      if (originalRequest._retryCount < MAX_RETRIES) {
        originalRequest._retryCount++;
        await new Promise(resolve => 
          setTimeout(resolve, RETRY_DELAY * originalRequest._retryCount!)
        );
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
