import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TabPanel from './TabPanel';

const Hero = () => {
  return (
    <div className="border-[2.5px] border-black rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden bg-white">
      <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-start">
        {/* Left column with text */}
        <div className="p-6 sm:p-8 md:p-[32px]">
          <h1 className="text-[32px] sm:text-[38px] md:text-[42px] font-extrabold text-black leading-[1.2]">
            Links That Drive<br className="hidden sm:block" /> SaaS Growth
          </h1>
          <p className="mt-4 md:mt-6 text-[#4B5563] text-[16px] sm:text-[18px] leading-[1.5] font-normal">
            We don't just build links. We create authority 
            that fuels organic growth for B2B SaaS brands.
          </p>
          
          {/* Impact metrics */}
          <div className="mt-8 md:mt-12">
            <p className="text-[14px] font-semibold text-[#6B7280] uppercase tracking-wider">OUR IMPACT</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 mt-4 sm:mt-6">
              <div className="flex flex-col sm:block">
                <p className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold text-black">3,402+</p>
                <p className="text-[14px] text-[#6B7280] font-medium leading-[1.4] mt-1 sm:mt-2">High-Authority Links Built</p>
              </div>
              <div className="flex flex-col sm:block">
                <p className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold text-black">142%</p>
                <p className="text-[14px] text-[#6B7280] font-medium leading-[1.4] mt-1 sm:mt-2">Avg. Traffic Increase</p>
              </div>
              <div className="flex flex-col sm:block">
                <p className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold text-black">27+</p>
                <p className="text-[14px] text-[#6B7280] font-medium leading-[1.4] mt-1 sm:mt-2">B2B SaaS Clients</p>
              </div>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="mt-8 md:mt-12">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link 
                href="/auth/" 
                className="border-[2.5px] border-black rounded-[6px] px-6 py-3 text-[16px] font-semibold text-black hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200 inline-block w-full sm:w-auto text-center"
              >
                Build My Link Pipeline
              </Link>
              <Link 
                href="/testimony" 
                className="border-[2.5px] border-black rounded-[6px] px-6 py-3 text-[16px] font-semibold text-black hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200 inline-block w-full sm:w-auto text-center"
              >
                Testimony
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-6 sm:mt-8">
              <Link 
                href="/pricing/" 
                className="text-black hover:text-[#333333] text-[16px] font-medium"
              >
                Link Building Packages
              </Link>
              <Link 
                href="/auth/" 
                className="text-black hover:text-[#333333] text-[16px] font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right column - social proof component */}
        <div className="border-t-[2.5px] md:border-t-0 border-t-black md:border-l-[2.5px] md:border-l-black md:h-full">
          <div className="border-[2.5px] border-black rounded-[12px] m-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="p-4 sm:p-5 md:p-[32px]">
              <p className="text-center text-[14px] font-semibold text-[#6B7280] uppercase tracking-wider">TRUSTED BY LEADING SAAS BRANDS</p>
            
              {/* Brand logos - top row */}
              <div className="grid grid-cols-3 gap-4 sm:gap-10 mt-4 sm:mt-6">
                <div className="flex justify-center items-center">
                  <Image 
                    src="https://headlesswp.growthog.com/wp-content/uploads/2024/10/semrush-logo.png" 
                    alt="Semrush" 
                    width={100} 
                    height={28}
                    priority
                    style={{ filter: 'grayscale(100%)', opacity: 0.7, width: 'auto', height: 'auto', maxHeight: '24px', maxWidth: '100%' }}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Image 
                    src="https://headlesswp.growthog.com/wp-content/uploads/2024/10/Monday2.png" 
                    alt="Monday.com" 
                    width={100} 
                    height={28}
                    style={{ filter: 'grayscale(100%)', opacity: 0.7, width: 'auto', height: 'auto', maxHeight: '24px', maxWidth: '100%' }}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Image 
                    src="https://headlesswp.growthog.com/wp-content/uploads/2024/10/clickup.png" 
                    alt="ClickUp" 
                    width={100}
                    height={28}
                    style={{ filter: 'grayscale(100%)', opacity: 0.7, width: 'auto', height: 'auto', maxHeight: '24px', maxWidth: '100%' }}
                  />
                </div>
              </div>
              
              {/* Brand logos - bottom row */}
              <div className="grid grid-cols-3 gap-4 sm:gap-10 mt-4 sm:mt-6 mb-4 sm:mb-6">
                <div className="flex justify-center items-center">
                  <Image 
                    src="https://headlesswp.growthog.com/wp-content/uploads/2024/10/hubspot.png" 
                    alt="HubSpot" 
                    width={100}
                    height={28}
                    style={{ filter: 'grayscale(100%)', opacity: 0.7, width: 'auto', height: 'auto', maxHeight: '24px', maxWidth: '100%' }}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Image 
                    src="https://headlesswp.growthog.com/wp-content/uploads/2025/04/idYux3LgxW_logos.png" 
                    alt="AppsFlyer" 
                    width={100}
                    height={28}
                    style={{ filter: 'grayscale(100%)', opacity: 0.7, width: 'auto', height: 'auto', maxHeight: '24px', maxWidth: '100%' }}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Image 
                    src="https://headlesswp.growthog.com/wp-content/uploads/2024/10/nextiva-1.png" 
                    alt="Nextiva" 
                    width={100}
                    height={28}
                    style={{ filter: 'grayscale(100%)', opacity: 0.7, width: 'auto', height: 'auto', maxHeight: '24px', maxWidth: '100%' }}
                  />
                </div>
              </div>
            
              {/* Tab Panel */}
              <TabPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;