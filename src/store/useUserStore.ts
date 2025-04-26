
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  avatar?: string;
  location?: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setUser: (user) => set({ 
        user,
        isAuthenticated: !!user,
      }),
      
      login: (userData) => set({ 
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      }),
      
      logout: () => set({ 
        user: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'user-storage',
    }
  )
);
