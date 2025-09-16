import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { user, loading, isTemporarySession } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [loading, user, router]);

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // If temporary session and not on allowed pages, show warning
  if (isTemporarySession && !router.pathname.includes('/dashboard/settings')) {
    return (
      <div className="min-h-screen bg-secondary-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 my-6">
          <div className="flex items-center mb-4 text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-lg font-semibold">Limited Access Mode</h2>
          </div>
          
          <p className="mb-4 text-secondary-700">
            You're currently using the dashboard in demo mode with limited access. To unlock all features and save your data, please authenticate your account.
          </p>
          
          <div className="rounded-md bg-amber-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-amber-800">
                  Any data entered in demo mode will not be permanently saved.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-700 hover:bg-secondary-800"
            >
              Continue in Demo Mode
            </button>
            
            <button
              onClick={() => router.push('/dashboard/settings')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Configure Authentication
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If we have a user (real or temporary), render the protected content
  return children;
}