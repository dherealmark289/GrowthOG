// This file has been simplified to remove credential-based authentication
// It now only handles quick access (name + email) functionality

// Sign in with name and email only (temporary session) - keeping for backward compatibility
export const signInWithNameEmail = async (name, email) => {
  try {
    // Create a temporary session data
    const tempSessionData = {
      id: 'temp-' + Date.now(),
      name: name,
      email: email,
      isTemporary: true,
      loginTime: new Date().toISOString()
    };
    
    // Store in localStorage for temporary access
    if (typeof window !== 'undefined') {
      localStorage.setItem('tempSession', JSON.stringify(tempSessionData));
    }
    
    // Store the user in our database via API
    try {
      const response = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'temp_auth',
          name,
          email
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.user) {
        // Successfully stored in our database
        return { 
          success: true, 
          user: {
            ...tempSessionData,
            ...data.user  // Include database fields
          }
        };
      }
      
    } catch (dbError) {
      console.warn('Error storing temporary user in database:', dbError);
      // Continue with localStorage even if database storage fails
    }
    
    // Fall back to just localStorage if API call failed
    return { success: true, user: tempSessionData };
  } catch (error) {
    console.error('Error creating temporary session:', error);
    return { 
      success: false, 
      message: error.message || 'Error creating temporary session. Please try again.' 
    };
  }
};

// Sign out
export const signOut = async () => {
  try {
    // Check for session type
    let isTemporary = false;
    
    if (typeof window !== 'undefined') {
      try {
        const tempSession = JSON.parse(localStorage.getItem('tempSession'));
        isTemporary = tempSession && tempSession.isTemporary;
      } catch (error) {
        console.error('Error checking temporary session:', error);
      }
      
      if (isTemporary) {
        // For temporary sessions, just remove from localStorage
        localStorage.removeItem('tempSession');
      } else {
        // For regular sessions, remove from localStorage
        localStorage.removeItem('session');
        
        // Call logout API endpoint to clear server-side session if we implement it
        try {
          await fetch('/api/auth/signout', { method: 'POST' });
        } catch (error) {
          console.warn('Error calling signout API:', error);
          // Continue even if the API call fails
        }
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { 
      success: false, 
      message: error.message || 'Error signing out. Please try again.' 
    };
  }
};

// Get current user from local storage and verify with server
export const getCurrentUser = async () => {
  try {
    // First check for regular session
    if (typeof window !== 'undefined') {
      const sessionData = localStorage.getItem('session');
      
      if (sessionData) {
        try {
          const parsedSession = JSON.parse(sessionData);
          
          // Verify session with the server
          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: parsedSession.id,
              token: parsedSession.token,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.valid) {
              return { 
                user: parsedSession, 
                isTemporary: false 
              };
            } else {
              // Session invalid - clear it
              localStorage.removeItem('session');
            }
          }
        } catch (error) {
          console.error('Error parsing or verifying session:', error);
          localStorage.removeItem('session');
        }
      }
    }
    
    // Then check for temporary session
    if (typeof window !== 'undefined') {
      try {
        const tempSession = JSON.parse(localStorage.getItem('tempSession'));
        if (tempSession && tempSession.isTemporary) {
          return { user: tempSession, isTemporary: true };
        }
      } catch (error) {
        console.error('Error parsing temporary session:', error);
      }
    }
    
    return { user: null, isTemporary: false };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { user: null, isTemporary: false, error: error.message };
  }
};

// Migration function removed since we're only supporting quick access

// Export missing functions and variables that other files expect
export const supabase = null; // Placeholder for backward compatibility
export const getSupabaseClient = () => null; // Placeholder for backward compatibility
export const updateSupabaseConfig = () => null; // Placeholder for backward compatibility