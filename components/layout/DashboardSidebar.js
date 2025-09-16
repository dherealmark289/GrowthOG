import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { 
  HomeIcon, 
  StarIcon, 
  DocumentTextIcon, 
  LinkIcon, 
  GlobeAltIcon, 
  Cog6ToothIcon, 
  ChatBubbleBottomCenterTextIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const DashboardSidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Priority Content', href: '/dashboard/priority-content', icon: StarIcon },
    { name: 'Campaign Builder', href: '/dashboard/campaign-builder', icon: DocumentTextIcon },
    { name: 'Link Progress', href: '/dashboard/link-progress', icon: LinkIcon },
    { name: 'Link Domains', href: '/dashboard/link-domains', icon: GlobeAltIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
    { name: 'Feedback', href: '/dashboard/feedback', icon: ChatBubbleBottomCenterTextIcon },
  ];
  
  const isActive = (path) => router.pathname === path;
  
  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };
  
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-secondary-900 bg-opacity-75 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Sidebar for mobile */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-secondary-200">
            <Link href="/" className="flex items-center">
              <svg className="h-8 w-auto text-primary-600" viewBox="0 0 47 40" fill="currentColor">
                <path d="M23.5 6.5C17.5 6.5 13.25 9.5 10.25 15.5C14.5 12.5 18.75 11.5 23 12.5C25.6 13.1 27.5 14.5 29 16.5C31.17 19.33 33.67 22.17 38.5 22.17C44.5 22.17 48.75 19.17 51.75 13.17C47.5 16.17 43.25 17.17 39 16.17C36.4 15.57 34.5 14.17 33 12.17C30.83 9.33 28.33 6.5 23.5 6.5ZM10.5 22.17C4.5 22.17 0.25 25.17 -2.75 31.17C1.5 28.17 5.75 27.17 10 28.17C12.6 28.77 14.5 30.17 16 32.17C18.17 35 20.67 37.83 25.5 37.83C31.5 37.83 35.75 34.83 38.75 28.83C34.5 31.83 30.25 32.83 26 31.83C23.4 31.23 21.5 29.83 20 27.83C17.83 25 15.33 22.17 10.5 22.17Z" />
              </svg>
              <span className="ml-2 text-lg font-bold text-secondary-900">GrowthOG</span>
            </Link>
            
            {/* Close button (mobile only) */}
            <button 
              className="md:hidden rounded-md p-2 text-secondary-500 hover:bg-secondary-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* User info */}
          <div className="px-4 py-4 border-b border-secondary-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <span className="text-sm font-medium leading-none">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </span>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {user?.email || 'User'}
                </p>
                <p className="text-xs text-secondary-500 truncate">
                  Member
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md 
                  ${isActive(item.href) 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900'}
                `}
              >
                <item.icon 
                  className={`
                    flex-shrink-0 mr-3 h-5 w-5 
                    ${isActive(item.href) ? 'text-primary-500' : 'text-secondary-500 group-hover:text-secondary-500'}
                  `}
                  aria-hidden="true" 
                />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Logout button */}
          <div className="px-2 py-4 border-t border-secondary-200">
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
            >
              <ArrowLeftOnRectangleIcon 
                className="flex-shrink-0 mr-3 h-5 w-5 text-red-500"
                aria-hidden="true" 
              />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
