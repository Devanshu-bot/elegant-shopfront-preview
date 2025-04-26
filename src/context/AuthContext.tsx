
import React, { createContext, useContext, ReactNode } from 'react';
import { useUserStore } from '@/store/useUserStore';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const refreshTokenFn = async () => {
  // This will be implemented later with real API
  console.log('Refreshing token...');
  return null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const userStore = useUserStore();

  const login = async (email: string, password: string) => {
    userStore.setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      userStore.login({
        id: '1',
        fullName: 'John Doe',
        email: email,
        mobileNumber: '+1234567890'
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      userStore.setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      userStore.logout();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user: userStore.user,
    isAuthenticated: userStore.isAuthenticated,
    isLoading: userStore.isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
