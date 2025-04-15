
export interface User {
  id: string;
  fullName: string;
  email: string;
  // Add more fields as needed based on what `/customer/current-user` returns
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
}

export interface AuthResponse {
  accessToken?: string;
  user?: User;
  message?: string;
}
