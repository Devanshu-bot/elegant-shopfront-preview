
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';

// Define form schemas with Zod
const requestOtpSchema = z.object({
  identifier: z.string().min(1, 'Email or mobile number is required'),
});

const resetPasswordSchema = z.object({
  identifier: z.string().min(1, 'Email or mobile number is required'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type RequestOtpFormValues = z.infer<typeof requestOtpSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = useState<'request-otp' | 'reset-password'>('request-otp');
  
  // Initialize request OTP form
  const requestOtpForm = useForm<RequestOtpFormValues>({
    resolver: zodResolver(requestOtpSchema),
    defaultValues: {
      identifier: '',
    },
  });

  // Initialize reset password form
  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      identifier: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Request OTP form submission handler
  const onRequestOtp = async (data: RequestOtpFormValues) => {
    try {
      setIsLoading(true);
      
      // Call forgot password API
      const response = await authService.forgotPassword({
        identifier: data.identifier,
      });
      
      if (response.success) {
        toast.success(response.message);
        
        // Move to reset password step
        resetPasswordForm.setValue('identifier', data.identifier);
        setStep('reset-password');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password form submission handler
  const onResetPassword = async (data: ResetPasswordFormValues) => {
    try {
      setIsLoading(true);
      
      // Call reset password API
      const response = await authService.resetPassword({
        identifier: data.identifier,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      
      if (response.success) {
        toast.success(response.message);
        navigate('/auth/login');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      const identifier = resetPasswordForm.getValues('identifier');
      
      if (!identifier) {
        toast.error('Please enter your email or mobile number');
        return;
      }
      
      await authService.forgotPassword({ identifier });
      toast.success('OTP sent successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        {step === 'request-otp' ? (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email or mobile number to receive a verification code
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...requestOtpForm}>
                <form onSubmit={requestOtpForm.handleSubmit(onRequestOtp)} className="space-y-4">
                  {/* Email/Mobile Field */}
                  <FormField
                    control={requestOtpForm.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email or Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com or 1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>
                Enter the OTP sent to your email or mobile and your new password
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...resetPasswordForm}>
                <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-4">
                  {/* Email/Mobile Field (readonly) */}
                  <FormField
                    control={resetPasswordForm.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email or Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com or 1234567890" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* OTP Field */}
                  <FormField
                    control={resetPasswordForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP Code</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123456" 
                            {...field} 
                            inputMode="numeric" 
                            maxLength={6}
                            autoComplete="one-time-code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* New Password Field */}
                  <FormField
                    control={resetPasswordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Confirm New Password Field */}
                  <FormField
                    control={resetPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500 text-center">
                Didn't receive the code?{' '}
                <Button 
                  variant="link"
                  className="p-0 h-auto font-semibold"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setStep('request-otp')}
              >
                Back
              </Button>
            </CardFooter>
          </>
        )}
        
        <CardFooter className={step === 'reset-password' ? 'pt-0 border-t-0' : ''}>
          <Button 
            variant="link" 
            className="w-full" 
            onClick={() => navigate('/auth/login')}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
