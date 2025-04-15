
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType, AuthResponse } from '@/types/auth';
import api, { setAccessToken, getAccessToken } from '@/lib/api';
import { toast } from 'sonner';

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  refreshToken: async () => null,
});

// Variable to track if we're currently refreshing the token
let isRefreshing = false;
// Function that will be accessible to the API interceptor
export let refreshTokenFn = async (): Promise<string | null> => {
  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to fetch current user data
  const fetchCurrentUser = async (): Promise<User | null> => {
    try {
      const response = await api.get<User>('/customer/current-user');
      return response.data;
    } catch (error) {
      return null;
    }
  };

  // Function to refresh the access token
  const refreshToken = async (): Promise<string | null> => {
    // Prevent multiple refresh calls
    if (isRefreshing) {
      // Wait until the refresh is complete
      await new Promise((resolve) => setTimeout(resolve, 100));
      return getAccessToken();
    }

    isRefreshing = true;

    try {
      const response = await api.post<AuthResponse>('/customer/refresh-token');
      
      // If the API returns a new access token, store it
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        return response.data.accessToken;
      }
      
      return getAccessToken();
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setUser(null);
      setAccessToken(null);
      return null;
    } finally {
      isRefreshing = false;
    }
  };

  // Make refreshToken available to the API interceptor
  refreshTokenFn = refreshToken;

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await api.post<AuthResponse>('/customer/login', {
        email,
        password
      });

      // If the API returns an access token directly, store it
      // Note: In many JWT implementations with httpOnly cookies, 
      // the server might not return the token in the response
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
      }

      // Fetch current user data after successful login
      const userData = await fetchCurrentUser();
      
      if (userData) {
        setUser(userData);
        toast.success("Logged in successfully!");
      } else {
        throw new Error("Failed to retrieve user data");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await api.post('/customer/logout');
      setUser(null);
      setAccessToken(null);
      toast.success("You've been logged out.");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize authentication state on component mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const userData = await fetchCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Provide auth context to the component tree
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
