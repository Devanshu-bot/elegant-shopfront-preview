
import axios from 'axios';
import { refreshTokenFn } from '@/context/AuthContext'; // We'll implement this later

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Variable to store access token in memory
let accessToken: string | null = null;

// Function to get the current access token
export const getAccessToken = () => accessToken;

// Function to set the access token
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // If we have a token, add it to the Authorization header
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the refresh token function from AuthContext
        await refreshTokenFn();
        
        // Update the authorization header with the new token
        const newToken = getAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        
        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
