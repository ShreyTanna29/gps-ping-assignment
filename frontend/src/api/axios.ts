import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api/v1", // Replace with your backend URL
  timeout: 10000, // Optional: Set timeout for requests
});

// Add a request interceptor to include the Authorization header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Optional: Handle response globally (e.g., for logging out on 401 errors)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized error
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
