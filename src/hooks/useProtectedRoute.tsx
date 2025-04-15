
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function useProtectedRoute(redirectTo: string = '/login') {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('Please login to access this page');
      navigate(redirectTo);
    }
  }, [user, isLoading, navigate, redirectTo]);

  return { isAuthenticated: !!user, isLoading };
}
