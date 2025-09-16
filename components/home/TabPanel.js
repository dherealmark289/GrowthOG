import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const TabPanel = () => {
  const [activeTab, setActiveTab] = useState('early'); // 'early', 'growth', or 'established'
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on client-side only
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    
    // Initial check
    handleResize();
    
    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const tabOptions = [
    { value: 'early', label: 'EARLY' },
    { value: 'growth', label: 'GROWTH' },
    { value: 'established', label: 'ESTABLISHED' }
  ];

  const CheckIcon = () => (
    <svg className="h-[18px] w-[18px] text-black mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );

  // Content for each tab
  const tabContent = {
    early: {
      title: "Early-Stage SaaS",
      subtitle: "Pre-Seed to Series A",
      points: [
        "Prove SEO as a viable channel",
        "Focus on ranking improvements",
        "Build foundation for growth"
      ],
      cta: "See Early-Stage SaaS Plan"
    },
    growth: {
      title: "Growth Stage SaaS",
      subtitle: "Series A to Series C",
      points: [
        "Expand keyword coverage",
        "Acquire advanced authority",
        "Drive qualified traffic"
      ],
      cta: "See Growth Stage Plan"
    },
    established: {
      title: "Established SaaS",
      subtitle: "Series C+ and Public Companies",
      points: [
        "Optimize conversion paths",
        "Maximize content ROI",
        "Maintain industry leadership"
      ],
      cta: "See Established Plan"
    }
  };

  // Current content based on active tab
  const content = tabContent[activeTab];

  return (
    <div>
      {/* Mobile Dropdown */}
      {isMobile ? (
        <div className="border-t border-t-[2.5px] border-[#E5E7EB]">
          <div className="p-4 pb-0">
            <select
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value)}
              className="w-full border-2 border-black rounded-md py-2 px-3 font-semibold text-[14px] bg-white"
            >
              {tabOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        /* Desktop Tabs */
        <div className="grid grid-cols-3 border-t border-t-[2.5px] border-[#E5E7EB]">
          {tabOptions.map((tab, index) => (
            <button
              key={tab.value}
              className={`py-3 font-semibold text-[14px] transition-colors duration-200 ${
                activeTab === tab.value 
                  ? 'bg-black text-white' 
                  : 'bg-white text-[#6B7280] hover:text-[#333]'
              } ${
                // Add border classes for middle tab
                index === 1 ? 'border-l border-r border-l-[2.5px] border-r-[2.5px] border-[#E5E7EB]' : ''
              }`}
              onClick={() => handleTabChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Tab content - same for both mobile and desktop */}
      <div className="p-4 sm:p-6">
        <div>
          <h2 className="text-[20px] sm:text-[24px] font-bold text-black">{content.title}</h2>
          <p className="text-[#6B7280] text-[14px] sm:text-[16px] font-normal mb-4 sm:mb-6">{content.subtitle}</p>
          
          <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {content.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon />
                <span className="text-black text-[14px] sm:text-[16px] font-medium leading-[1.5] pl-2">{point}</span>
              </li>
            ))}
          </ul>
          
          <div>
            <Link 
              href="/services/" 
              className="inline-block bg-black text-white py-2 sm:py-3 px-4 sm:px-6 text-[14px] sm:text-[16px] font-semibold rounded-[6px] hover:bg-[#333333] transition-colors duration-200 w-full sm:w-auto text-center"
            >
              {content.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabPanel;