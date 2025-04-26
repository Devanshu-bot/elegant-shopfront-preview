
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'sonner';

export function useProtectedRoute(redirectTo: string = '/auth/login') {
  const { isAuthenticated, isLoading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('Please login to access this page');
      navigate(redirectTo);
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return { isAuthenticated, isLoading };
}
