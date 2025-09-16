import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser, signInWithNameEmail, signOut } from '../lib/supabase';

// Create the authentication context
const AuthContext = createContext();

// Create a provider component for the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTemporary, setIsTemporary] = useState(false);
  const router = useRouter();

  // Function to check if there's a session from Supabase or localStorage
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }
    
    const checkSession = async () => {
      try {
        // Check for user session
        const { user: sessionUser, isTemporary: tempSession } = await getCurrentUser();
        
        if (sessionUser) {
          setUser(sessionUser);
          setIsTemporary(tempSession);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    // Set up a window event listener for auth changes
    const handleStorageChange = async (e) => {
      // Check if the session storage has changed
      if (e.key === 'session' || e.key === 'tempSession') {
        console.log('Auth state changed:', e.key);
        
        // Re-run the check session logic
        const { user: sessionUser, isTemporary: tempSession } = await getCurrentUser();
        
        if (sessionUser) {
          setUser(sessionUser);
          setIsTemporary(tempSession);
          
          // Redirect to dashboard if not already there and we got a new login
          if (!router.pathname.includes('/dashboard') && e.oldValue === null) {
            router.push('/dashboard');
          }
        } else {
          // If there's no user session, redirect to auth
          setUser(null);
          setIsTemporary(false);
          
          if (router.pathname.includes('/dashboard')) {
            router.push('/auth');
          }
        }
      }
    };
    
    // Add storage event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  // No longer needed - simplified to just use name+email authentication

  // Sign in with name and email (temporary session)
  const handleNameEmailSignIn = async (name, email) => {
    try {
      setLoading(true);
      
      const result = await signInWithNameEmail(name, email);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsTemporary(true);
      }
      
      return result;
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Error creating temporary session. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      setLoading(true);
      
      const result = await signOut();
      
      if (result.success) {
        setUser(null);
        setIsTemporary(false);
        router.push('/auth');
      }
      
      return result;
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Error signing out. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // This function is no longer needed as we're not supporting permanent accounts
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isTemporary,
        signInWithNameEmail: handleNameEmailSignIn,
        signOut: handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-Order Component for protected routes
export const withAuth = (Component) => {
  const WithAuth = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/auth');
      }
    }, [loading, user, router]);

    if (loading) {
      return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>;
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };

  return WithAuth;
};