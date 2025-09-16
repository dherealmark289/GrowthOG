import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from '../../lib/supabase';

export default function DashboardHeader({ user, isTemporary }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const tabs = [
    { name: 'PRIORITY CONTENT', href: '/dashboard/priority-content' },
    { name: 'CAMPAIGN BUILDER', href: '/dashboard/campaign-builder' },
    { name: 'LINK PROGRESS', href: '/dashboard/link-progress' },
    { name: 'LINK DOMAINS', href: '/dashboard/link-domains' },
    { name: 'SETTINGS', href: '/dashboard/settings' },
  ];

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
  };
  
  // Get user's display name or email
  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  
  // Get user's initials for the avatar
  const getInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name[0].toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };
  
  return (
    <div>
      {/* Top section with user info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[32px] font-extrabold text-black mb-2">Client Dashboard</h1>
          <div>
            <span className="text-[16px] text-[#2563EB] align-middle">Your link building campaign at a glance</span>
            {!user && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[12px] font-semibold bg-black text-white">
                BETA
              </span>
            )}
            {isTemporary && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[12px] font-semibold bg-[#FEF3C7] text-[#92400E]">
                TEMPORARY
              </span>
            )}
          </div>
        </div>
        
        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 text-sm focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-medium">
              {getInitials()}
            </div>
            <span className="font-medium text-gray-700">{displayName}</span>
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <Link 
                  href="/dashboard/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-[#F9FAFB] rounded-lg overflow-hidden mb-6">
        <div className="flex w-full">
          {tabs.map((tab) => {
            const isActive = currentPath === tab.href || 
                            (currentPath === '/dashboard' && tab.href === '/dashboard/priority-content');
            
            return (
              <Link 
                key={tab.name} 
                href={tab.href}
                className={`
                  flex-1 py-3 px-1 text-center text-[14px] font-medium
                  ${isActive
                    ? 'bg-white text-[#2563EB] font-semibold border-b-2 border-[#2563EB]'
                    : 'text-[#6B7280] hover:text-gray-700'
                  }
                `}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}