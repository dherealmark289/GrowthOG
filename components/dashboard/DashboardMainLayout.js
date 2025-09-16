import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { getCurrentUser } from '../../lib/supabase';

export default function DashboardMainLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* Top Navigation */}
      <header className="bg-white border-b-[2.5px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="font-bold text-xl">
                GrowthOG
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-[16px] text-[#4B5563] hover:text-gray-900">
                Services
              </Link>
              <Link href="/pricing" className="text-[16px] text-[#4B5563] hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/resources" className="text-[16px] text-[#4B5563] hover:text-gray-900">
                Resources
              </Link>
              <Link href="/about-us" className="text-[16px] text-[#4B5563] hover:text-gray-900">
                About Us
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 mr-2">
                <span className="text-sm font-medium">
                  {/* First letter of username */}
                  {user ? user.email.charAt(0).toUpperCase() : 'G'}
                </span>
              </div>
              <span className="text-[14px] text-gray-700">
                {user ? (user.email.split('@')[0]) : 'Guest'}
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Subheader with Back link and Beta message */}
      <div className="bg-white border-b-[2.5px] border-black py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center text-[14px] text-[#2563EB] hover:text-blue-800"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Website
          </Link>
          {!user && (
            <div className="flex items-center">
              <span className="text-[14px] text-[#6B7280] mr-4">
                Beta dashboard in progress. Bugs expected - your feedback helps us improve
              </span>
              <button className="flex items-center px-2 py-1 border-[2.5px] border-black rounded text-[14px] text-gray-700">
                <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                Feedback
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white border-[2.5px] border-black rounded-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}