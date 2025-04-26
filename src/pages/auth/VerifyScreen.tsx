
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { useUserStore } from '@/store/useUserStore';

// Define form schema with Zod
const verifySchema = z.object({
  identifier: z.string().min(1, 'Email or mobile number is required'),
  otp: z.string().length(6, 'OTP must be 6 digits')
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export default function VerifyScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUserStore();
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Get identifier from navigation state
  const identifier = location.state?.identifier || '';
  
  // Initialize react-hook-form
  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      identifier,
      otp: '',
    },
  });

  useEffect(() => {
    // If no identifier is provided, redirect to registration
    if (!identifier) {
      toast.error('Please register first');
      navigate('/auth/register');
    }
  }, [identifier, navigate]);

  // Form submission handler
  const onSubmit = async (data: VerifyFormValues) => {
    try {
      setIsLoading(true);
      
      // Call verify API
      const response = await authService.verifyOtp({
        identifier: data.identifier,
        otp: data.otp,
      });
      
      // On success, login the user and redirect to home
      if (response.success && response.user) {
        login(response.user);
        toast.success(response.message);
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      const identifier = form.getValues('identifier');
      
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
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify your account</CardTitle>
          <CardDescription>
            Enter the 6-digit OTP sent to your email or mobile
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email/Mobile Field */}
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Mobile Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john@example.com or 1234567890" 
                        {...field} 
                        readOnly={!!identifier}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* OTP Field */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123456" 
                        {...field} 
                        inputMode="numeric" 
                        pattern="[0-9]*"
                        maxLength={6}
                        autoComplete="one-time-code"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Account'}
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
            onClick={() => navigate('/auth/register')}
          >
            Back to Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
