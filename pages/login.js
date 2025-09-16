import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Redirect to the auth page
export default function Login() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/auth');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <LoadingSpinner size="large" />
    </div>
  );
}