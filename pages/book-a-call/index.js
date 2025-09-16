import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BookCallPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.replace('/');
  }, [router]);

  return null;
}