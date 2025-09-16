import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from './DashboardSidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { getSEOTags } from '../../utils/seo';

const DashboardLayout = ({ children, seo = {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const seoTags = getSEOTags({ 
    ...seo,
    title: `${seo.title || 'Dashboard'} | GrowthOG`
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=' + router.asPath);
    }
  }, [loading, isAuthenticated, router]);

  // Show loading state while checking authentication
  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{seoTags.title}</title>
        {seoTags.meta.map((meta, index) => (
          <meta key={`${meta.name || meta.property}-${index}`} {...meta} />
        ))}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen overflow-hidden bg-secondary-50">
        {/* Sidebar */}
        <DashboardSidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />

        {/* Main content */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          {/* Mobile header */}
          <div className="pt-1 pl-1 md:hidden bg-white shadow-sm">
            <button
              className="px-4 py-3 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Dashboard content */}
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
