import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const { user, loading, signInWithNameEmail } = useAuth();
  const router = useRouter();
  
  // Check if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);
  
  // We've removed the credential-based methods
  // Only quick access is now available
  
  // Handle quick access (temporary session)
  const handleQuickAccess = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      setMessage({ type: 'error', text: 'Please enter both your name and email address.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const result = await signInWithNameEmail(name, email);
      
      if (result.success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
      console.error('Quick access error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      seo={{
        title: 'Sign In | GrowthOG',
        description: 'Sign in to your GrowthOG account to access your dashboard and campaign progress.',
      }}
    >
      <div className="bg-[#F9FAFB] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden">
              <div className="md:flex">
                {/* Left column - Auth Form */}
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GrowthOG</h1>
                    <p className="text-gray-600">
                      Get started with just your name and email.
                    </p>
                  </div>

                  {/* Status Messages */}
                  {message.text && (
                    <div
                      className={`p-4 mb-6 rounded-md ${
                        message.type === 'error'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {/* Quick Access Form */}
                  <form onSubmit={handleQuickAccess} className="space-y-6">
                    <div>
                      <label htmlFor="name-quick" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name-quick"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                        placeholder="John Doe"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email-quick" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email-quick"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                        placeholder="you@example.com"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-[#333333] focus:outline-none ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Signing in...' : 'Continue to Dashboard'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right column - Hero/Onboarding Section */}
                <div className="md:w-1/2 bg-[#0F172A] text-white p-8 md:p-12">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">
                        Supercharge Your Link Building Strategy
                      </h2>
                      <div className="space-y-4 mb-8">
                        <div className="flex items-start">
                          <svg
                            className="h-5 w-5 text-[#FFC107] mr-2 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>Track your link building campaigns in real-time</p>
                        </div>
                        <div className="flex items-start">
                          <svg
                            className="h-5 w-5 text-[#FFC107] mr-2 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>Analyze the impact of your backlinks on traffic and rankings</p>
                        </div>
                        <div className="flex items-start">
                          <svg
                            className="h-5 w-5 text-[#FFC107] mr-2 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>Build campaigns tailored to your business goals</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-[#2D3748]">
                      <blockquote className="italic text-sm text-[#A0AEC0]">
                        "GrowthOG helped us achieve a 182% increase in organic traffic over 18 months with their strategic link building campaigns."
                      </blockquote>
                      <div className="mt-4 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#2D3748] flex items-center justify-center text-xs font-medium">
                          SC
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Sarah Chen</p>
                          <p className="text-xs text-[#A0AEC0]">CTO, SaaS Company</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}