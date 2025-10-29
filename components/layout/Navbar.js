import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import BookStrategyCallModal from '../BookStrategyCallModal';

const Navbar = () => {
  const { user } = useAuth();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on client-side only
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    
    // Initial check
    handleResize();
    
    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle dropdown toggle
  const toggleResources = (e) => {
    if (e) e.preventDefault(); // Prevent default only if event is provided
    setResourcesOpen(!resourcesOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Close resources dropdown when main menu is toggled
    if (resourcesOpen) {
      setResourcesOpen(false);
    }
  };

  // Open the book strategy call modal
  const openBookCallModal = () => {
    setIsModalOpen(true);
    
    // Close mobile menu when opening modal
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Close the book strategy call modal
  const closeBookCallModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="py-1 border-b-[2.5px] border-black relative z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="inline-block">
                <div className="relative" style={{ height: 'auto', width: 'auto' }}>
                  <Image
                    src="/images/case-studies/logo-1.png"
                    alt="GrowthOG"
                    width={70}
                    height={20}
                    className="object-contain"
                    priority
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-black focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  // X icon
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/services" 
                className="text-[#4B5563] hover:text-black text-base font-medium"
              >
                Services
              </Link>
              <Link 
                href="/pricing" 
                className="text-[#4B5563] hover:text-black text-base font-medium"
              >
                Pricing
              </Link>
              
              {/* Resources dropdown */}
              <div className="relative">
                <div className="flex items-center">
                  <Link 
                    href="/resources/" 
                    className="text-[#4B5563] hover:text-black text-base font-medium"
                  >
                    Resources
                  </Link>
                  <button 
                    className="ml-1 text-[#4B5563] hover:text-black flex items-center"
                    onClick={(e) => toggleResources(e)}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={resourcesOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  </button>
                </div>
                
                {/* Dropdown menu */}
                {resourcesOpen && (
                  <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link href="/case-studies/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Case Studies
                    </Link>
                    <Link href="/link-building-blog/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Blog
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                href="/about-us" 
                className="text-[#4B5563] hover:text-black text-base font-medium"
              >
                About Us
              </Link>
              
              <Link 
                href="/auth/" 
                className="text-black border border-[#E5E7EB] rounded px-4 py-2 text-base font-medium hover:bg-gray-50"
              >
                Access Dashboard
              </Link>
              
              <button 
                onClick={openBookCallModal}
                className="bg-black text-white rounded-md px-4 py-2 text-base font-medium hover:bg-[#333333]"
              >
                Book a Strategy Call
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide in from top */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-20 mt-[66px]">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={toggleMobileMenu}></div>
            
            {/* Menu content */}
            <div className="relative bg-white h-auto border-b border-gray-200 shadow-lg pt-4 pb-6 px-8 z-30">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/services" 
                  className="text-[#4B5563] hover:text-black text-lg font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  Services
                </Link>
                <Link 
                  href="/pricing" 
                  className="text-[#4B5563] hover:text-black text-lg font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  Pricing
                </Link>
                
                {/* Resources collapsible section */}
                <div>
                  <div className="flex items-center justify-between w-full">
                    {/* Link to /resources/ page */}
                    <Link 
                      href="/resources/" 
                      className="text-[#4B5563] hover:text-black text-lg font-medium py-2 flex-grow text-left"
                      onClick={toggleMobileMenu}
                    >
                      Resources
                    </Link>
                    
                    {/* Dropdown button (separate from the link) */}
                    <button 
                      className="text-[#4B5563] hover:text-black ml-2 p-2"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent any navigation
                        toggleResources();
                      }}
                    >
                      <svg className="h-5 w-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Collapsible content */}
                  {resourcesOpen && (
                    <div className="pl-4 py-2 flex flex-col space-y-3">
                      <Link 
                        href="/case-studies/" 
                        className="text-[#4B5563] hover:text-black text-base py-1"
                        onClick={toggleMobileMenu}
                      >
                        Case Studies
                      </Link>
                      <Link 
                        href="/link-building-blog/" 
                        className="text-[#4B5563] hover:text-black text-base py-1"
                        onClick={toggleMobileMenu}
                      >
                        Blog
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link 
                  href="/about-us" 
                  className="text-[#4B5563] hover:text-black text-lg font-medium py-2"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </Link>
                
                <Link 
                  href="/auth/" 
                  className="text-black border border-[#E5E7EB] rounded-md px-4 py-3 text-base font-medium hover:bg-gray-50 text-center mt-2"
                  onClick={toggleMobileMenu}
                >
                  Access Dashboard
                </Link>
                
                <button 
                  onClick={openBookCallModal}
                  className="bg-black text-white rounded-md px-4 py-3 text-base font-medium hover:bg-[#333333] mt-2"
                >
                  Book a Strategy Call
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Book Strategy Call Modal */}
      <BookStrategyCallModal 
        isOpen={isModalOpen} 
        onClose={closeBookCallModal} 
      />
    </>
  );
};

export default Navbar;