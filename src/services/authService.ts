
import { User } from '@/store/useUserStore';
import { toast } from 'sonner';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUser: User = {
  id: '123456',
  fullName: 'John Doe',
  email: 'john@example.com',
  mobileNumber: '1234567890',
};

export const authService = {
  // Register a new user
  async register(data: { 
    fullName: string; 
    email: string; 
    mobileNumber: string; 
    password: string; 
  }) {
    try {
      await delay(1500); // Simulate network delay
      
      // Simulate API call to /api/auth/register
      console.log('Registering user:', data);
      
      return {
        success: true,
        message: 'Registration successful! Please verify your account.',
        email: data.email,
        mobileNumber: data.mobileNumber,
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  },
  
  // Verify OTP
  async verifyOtp(data: { 
    identifier: string; // Email or mobile
    otp: string; 
  }) {
    try {
      await delay(1500);
      
      // Simulate API call to /api/auth/verify-otp
      console.log('Verifying OTP:', data);
      
      // Validate OTP (mock always succeeds with "123456")
      if (data.otp !== '123456') {
        throw new Error('Invalid OTP. Please try again.');
      }
      
      return {
        success: true,
        user: mockUser,
        message: 'Account verified successfully!',
      };
    } catch (error: any) {
      console.error('OTP verification error:', error);
      throw new Error(error.message || 'OTP verification failed. Please try again.');
    }
  },
  
  // Login user
  async login(data: { 
    identifier: string; // Email or mobile
    password: string; 
  }) {
    try {
      await delay(1500);
      
      // Simulate API call to /api/auth/login
      console.log('Logging in:', data);
      
      // Mock validation (always succeeds with password "password")
      if (data.password !== 'password') {
        throw new Error('Invalid credentials. Please try again.');
      }
      
      return {
        success: true,
        user: mockUser,
        message: 'Login successful!',
      };
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  },
  
  // Forgot password - send OTP
  async forgotPassword(data: { 
    identifier: string; // Email or mobile
  }) {
    try {
      await delay(1500);
      
      // Simulate API call to /api/auth/forgot-password
      console.log('Forgot password request:', data);
      
      return {
        success: true,
        message: 'OTP sent to your email/mobile!',
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error('Failed to send OTP. Please try again.');
    }
  },
  
  // Reset password with OTP
  async resetPassword(data: { 
    identifier: string; // Email or mobile
    otp: string;
    newPassword: string;
  }) {
    try {
      await delay(1500);
      
      // Simulate API call to /api/auth/reset-password
      console.log('Reset password request:', data);
      
      // Validate OTP (mock always succeeds with "123456")
      if (data.otp !== '123456') {
        throw new Error('Invalid OTP. Please try again.');
      }
      
      return {
        success: true,
        message: 'Password reset successful!',
      };
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Failed to reset password. Please try again.');
    }
  },
  
  // Change password (when logged in)
  async changePassword(data: { 
    oldPassword: string; 
    newPassword: string;
  }) {
    try {
      await delay(1500);
      
      // Simulate API call to /api/auth/change-password
      console.log('Change password request:', data);
      
      // Mock validation (always succeeds with old password "password")
      if (data.oldPassword !== 'password') {
        throw new Error('Current password is incorrect.');
      }
      
      return {
        success: true,
        message: 'Password changed successfully!',
      };
    } catch (error: any) {
      console.error('Change password error:', error);
      throw new Error(error.message || 'Failed to change password. Please try again.');
    }
  },
  
  // Logout user
  async logout() {
    await delay(500);
    console.log('User logged out');
    return { success: true };
  },
};
