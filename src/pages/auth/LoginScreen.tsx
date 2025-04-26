
import React from 'react';
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
import { useUserStore } from '@/store/useUserStore';

// Define form schema with Zod
const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or mobile number is required'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Initialize react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      
      // Call login API
      const response = await authService.login({
        identifier: data.identifier,
        password: data.password,
      });
      
      // On success, login the user and redirect to home
      if (response.success && response.user) {
        login(response.user);
        toast.success(response.message);
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
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
                      <Input placeholder="john@example.com or 1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm" 
                        onClick={() => navigate('/auth/forgot-password')}
                        type="button"
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-gray-500 text-center">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto font-semibold" 
              onClick={() => navigate('/auth/register')}
            >
              Create account
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
