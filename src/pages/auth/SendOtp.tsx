
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

const sendOtpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type SendOtpFormValues = z.infer<typeof sendOtpSchema>;

export default function SendOtp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SendOtpFormValues>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: SendOtpFormValues) => {
    setIsSubmitting(true);
    try {
      await api.post('/customer/sendotp', { email: data.email });
      toast.success('OTP sent successfully to your email');
      navigate(`/auth/register?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Enter your email to receive a one-time password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="your.email@example.com" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending OTP
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Button variant="link" className="p-0" onClick={() => navigate('/auth/login')}>
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
