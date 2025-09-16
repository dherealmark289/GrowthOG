import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CaseStudies() {
  const router = useRouter();
  
  // Filter states
  const [companyStage, setCompanyStage] = useState('Company Stage');
  const [linkStrategy, setLinkStrategy] = useState('Link Strategy');
  const [industry, setIndustry] = useState('Industry');
  const [results, setResults] = useState('Results');
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on client-side only
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    
    // Initial check
    handleResize();
    
    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Client abbreviation box colors
  const clientColors = {
    'SaaS': '#2563EB', // blue
    'FS': '#0EA5E9', // teal/light blue
    'Mon': '#3B82F6', // medium blue
    'Wr': '#8B5CF6', // purple
    'Nx': '#06B6D4', // teal
    'SEM': '#10B981', // green
    'Hub': '#F97316' // orange
  };

  const caseStudies = [
    {
      id: 'saas',
      name: 'SaaS Company',
      shortName: 'SaaS',
      industry: 'SaaS / Technology',
      trafficIncrease: '182%',
      trafficRange: '9K → 26K',
      linksBuilt: 674,
      timeframe: '18 months',
      status: 'completed'
    },
    {
      id: 'fintech',
      name: 'Fintech Startup',
      shortName: 'FS',
      industry: 'Financial Technology',
      trafficIncrease: '48%',
      trafficRange: '54K → 79K',
      linksBuilt: 24,
      timeframe: '6 months',
      status: 'completed'
    },
    {
      id: 'monday',
      name: 'Monday.com',
      shortName: 'Mon',
      industry: 'Productivity SaaS',
      trafficIncrease: '142%',
      trafficRange: '1.2M → 2.8M',
      linksBuilt: 551,
      timeframe: '12 months',
      status: 'pending'
    },
    {
      id: 'writer',
      name: 'Writer.com',
      shortName: 'Wr',
      industry: 'AI Writing SaaS',
      trafficIncrease: '217%',
      trafficRange: '93K → 293K',
      linksBuilt: 327,
      timeframe: '9 months',
      status: 'pending'
    },
    {
      id: 'nextiva',
      name: 'Nextiva',
      shortName: 'Nx',
      industry: 'Communication SaaS',
      trafficIncrease: '94%',
      trafficRange: '206K → 515K',
      linksBuilt: 489,
      timeframe: '14 months',
      status: 'pending'
    },
    {
      id: 'semrush',
      name: 'SEMrush',
      shortName: 'SEM',
      industry: 'SEO SaaS',
      trafficIncrease: '63%',
      trafficRange: '1.2M → 1.9M',
      linksBuilt: 682,
      timeframe: '18 months',
      status: 'pending'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      shortName: 'Hub',
      industry: 'Marketing SaaS',
      trafficIncrease: '78%',
      trafficRange: '3.5M → 6.8M',
      linksBuilt: 734,
      timeframe: '24 months',
      status: 'pending'
    }
  ];

  // Map internal IDs to exact WordPress slugs for live routes
  const slugMap = {
    saas: '182-traffic-growth-and-195-increase-in-organic-keywords-in-18-months',
    fintech: 'the-24-link-strategy-that-drove-48-traffic-growth',
  };

  // Add additional fields to case studies for filtering
  const enhancedCaseStudies = caseStudies.map(study => {
    const stageMap = {
      'saas': 'Early',
      'fintech': 'Growth',
      'monday': 'Established',
      'writer': 'Growth',
      'nextiva': 'Established',
      'semrush': 'Established',
      'hubspot': 'Established'
    };
    
    const strategyMap = {
      'saas': 'Resource Link Building',
      'fintech': 'Guest Posting',
      'monday': 'Skyscraper Technique',
      'writer': 'Resource Link Building',
      'nextiva': 'Guest Posting',
      'semrush': 'Skyscraper Technique',
      'hubspot': 'Guest Posting'
    };
    
    const industryCategory = study.industry.includes('Marketing') ? 'Marketing' :
                            study.industry.includes('Productivity') ? 'Productivity' :
                            'Sales';
    
    const resultsCategory = parseInt(study.trafficIncrease) > 100 ? 'Traffic Increase' :
                           study.linksBuilt > 500 ? 'Ranking improvements' :
                           'Lead Generation';
                           
    return {
      ...study,
      companyStage: stageMap[study.id] || 'Growth',
      linkStrategy: strategyMap[study.id] || 'Guest Posting',
      industryCategory,
      resultsCategory
    };
  });
  
  // Set filtered studies on component mount
  useEffect(() => {
    setFilteredStudies(enhancedCaseStudies);
  }, []);
  
  // Handle filter changes
  const handleCompanyStageChange = (e) => {
    setCompanyStage(e.target.value);
    applyFilters(e.target.value, linkStrategy, industry, results);
  };
  
  const handleLinkStrategyChange = (e) => {
    setLinkStrategy(e.target.value);
    applyFilters(companyStage, e.target.value, industry, results);
  };
  
  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
    applyFilters(companyStage, linkStrategy, e.target.value, results);
  };
  
  const handleResultsChange = (e) => {
    setResults(e.target.value);
    applyFilters(companyStage, linkStrategy, industry, e.target.value);
  };
  
  // Apply filters
  const applyFilters = (companyStage, linkStrategy, industry, results) => {
    let filtered = [...enhancedCaseStudies];
    
    if (companyStage !== 'Company Stage') {
      filtered = filtered.filter(study => study.companyStage === companyStage);
    }
    
    if (linkStrategy !== 'Link Strategy') {
      filtered = filtered.filter(study => study.linkStrategy === linkStrategy);
    }
    
    if (industry !== 'Industry') {
      filtered = filtered.filter(study => study.industryCategory === industry);
    }
    
    if (results !== 'Results') {
      filtered = filtered.filter(study => study.resultsCategory === results);
    }
    
    setFilteredStudies(filtered);
  };
  
  // Reset filters
  const resetFilters = () => {
    setCompanyStage('Company Stage');
    setLinkStrategy('Link Strategy');
    setIndustry('Industry');
    setResults('Results');
    setFilteredStudies(enhancedCaseStudies);
  };
  
  // Handle row click
  const handleRowClick = (study) => {
    if (study.status === 'completed') {
      const slug = slugMap[study.id] || study.id;
      router.push(`/case-studies/${slug}`);
    }
  };

  return (
    <Layout
      seo={{
        title: 'Case Studies | GrowthOG',
        description: 'Real results for B2B SaaS companies at every growth stage.',
      }}
    >
      <div className="bg-[#F9FAFB] py-8">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="border-[2.5px] border-black rounded-[12px] bg-white p-8">
            {/* Header Section */}
            <div className="pb-6">
              <h1 className="text-[36px] font-extrabold text-black leading-tight">Case Studies</h1>
              <p className="text-[16px] font-normal text-[#6B7280] mt-2">
                Real results for B2B SaaS companies at every growth stage
              </p>
            </div>

            {/* Filter Bar - Mobile Collapsible Version */}
            <div className="mb-6">
              {/* Mobile Filter Toggle Button */}
              <div className="md:hidden mb-4">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex justify-between items-center p-3 border-[1.5px] border-gray-300 rounded-[6px] bg-white"
                >
                  <span className="font-medium text-[14px]">Filters</span>
                  <svg 
                    className={`h-5 w-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Desktop Filter Bar */}
              <div className={`${isMobile ? (isFilterOpen ? 'block' : 'hidden') : 'block'}`}>
                {/* Mobile Vertical Layout */}
                <div className="md:hidden space-y-3">
                  <div className="relative w-full">
                    <select 
                      className="w-full appearance-none bg-transparent border border-gray-300 rounded-md focus:ring-0 text-[14px] text-black px-4 py-2"
                      value={companyStage}
                      onChange={handleCompanyStageChange}
                    >
                      <option value="Company Stage">Company Stage</option>
                      <option value="Early">Early</option>
                      <option value="Growth">Growth</option>
                      <option value="Established">Established</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  
                  <div className="relative w-full">
                    <select 
                      className="w-full appearance-none bg-transparent border border-gray-300 rounded-md focus:ring-0 text-[14px] text-black px-4 py-2"
                      value={linkStrategy}
                      onChange={handleLinkStrategyChange}
                    >
                      <option value="Link Strategy">Link Strategy</option>
                      <option value="Guest Posting">Guest Posting</option>
                      <option value="Skyscraper Technique">Skyscraper Technique</option>
                      <option value="Resource Link Building">Resource Link Building</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  
                  <div className="relative w-full">
                    <select 
                      className="w-full appearance-none bg-transparent border border-gray-300 rounded-md focus:ring-0 text-[14px] text-black px-4 py-2"
                      value={industry}
                      onChange={handleIndustryChange}
                    >
                      <option value="Industry">Industry</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Sales">Sales</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  
                  <div className="relative w-full">
                    <select 
                      className="w-full appearance-none bg-transparent border border-gray-300 rounded-md focus:ring-0 text-[14px] text-black px-4 py-2"
                      value={results}
                      onChange={handleResultsChange}
                    >
                      <option value="Results">Results</option>
                      <option value="Traffic Increase">Traffic Increase</option>
                      <option value="Ranking improvements">Ranking improvements</option>
                      <option value="Lead Generation">Lead Generation</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  
                  <button 
                    className="w-full py-2 text-[14px] font-medium text-[#4B5563] bg-[#F9FAFB] border border-gray-300 rounded-md hover:bg-[#F1F5F9]"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>

                {/* Desktop Horizontal Layout */}
                <div className="hidden md:block">
                  <div className="h-[48px] flex items-center border-[1.5px] border-gray-300 rounded-[6px] overflow-hidden">
                    <div className="h-full flex items-center px-4 border-r border-[1px] border-gray-300">
                      <span className="text-[14px] font-semibold text-black">Filter by:</span>
                    </div>
                    
                    <div className="h-full relative flex items-center border-r border-[1px] border-gray-300">
                      <select 
                        className="h-full appearance-none bg-transparent border-none focus:ring-0 text-[14px] text-black px-4 py-0"
                        value={companyStage}
                        onChange={handleCompanyStageChange}
                      >
                        <option value="Company Stage">Company Stage</option>
                        <option value="Early">Early</option>
                        <option value="Growth">Growth</option>
                        <option value="Established">Established</option>
                      </select>
                      <svg className="absolute right-4 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    
                    <div className="h-full relative flex items-center border-r border-[1px] border-gray-300">
                      <select 
                        className="h-full appearance-none bg-transparent border-none focus:ring-0 text-[14px] text-black px-4 py-0"
                        value={linkStrategy}
                        onChange={handleLinkStrategyChange}
                      >
                        <option value="Link Strategy">Link Strategy</option>
                        <option value="Guest Posting">Guest Posting</option>
                        <option value="Skyscraper Technique">Skyscraper Technique</option>
                        <option value="Resource Link Building">Resource Link Building</option>
                      </select>
                      <svg className="absolute right-4 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    
                    <div className="h-full relative flex items-center border-r border-[1px] border-gray-300">
                      <select 
                        className="h-full appearance-none bg-transparent border-none focus:ring-0 text-[14px] text-black px-4 py-0"
                        value={industry}
                        onChange={handleIndustryChange}
                      >
                        <option value="Industry">Industry</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Sales">Sales</option>
                      </select>
                      <svg className="absolute right-4 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    
                    <div className="h-full relative flex items-center border-r border-[1px] border-gray-300">
                      <select 
                        className="h-full appearance-none bg-transparent border-none focus:ring-0 text-[14px] text-black px-4 py-0"
                        value={results}
                        onChange={handleResultsChange}
                      >
                        <option value="Results">Results</option>
                        <option value="Traffic Increase">Traffic Increase</option>
                        <option value="Ranking improvements">Ranking improvements</option>
                        <option value="Lead Generation">Lead Generation</option>
                      </select>
                      <svg className="absolute right-4 w-[10px] h-[10px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    
                    <button 
                      className="h-full flex items-center px-4 text-[14px] font-medium text-[#4B5563] bg-[#F9FAFB] ml-auto hover:bg-[#F1F5F9]"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Studies Table */}
            <div className="border-[1.5px] border-gray-300 rounded-[6px] overflow-hidden">
              {/* Desktop Table Header - Hidden on Mobile */}
              <div className="hidden md:grid grid-cols-5 bg-[#F9FAFB] border-b border-[1px] border-gray-300">
                <div className="py-3 px-4 text-[14px] font-semibold text-black">Client</div>
                <div className="py-3 px-4 text-[14px] font-semibold text-black text-center">Traffic Increase</div>
                <div className="py-3 px-4 text-[14px] font-semibold text-black text-center">Links Built</div>
                <div className="py-3 px-4 text-[14px] font-semibold text-black text-center">Timeframe</div>
                <div className="py-3 px-4 text-[14px] font-semibold text-black text-center">Actions</div>
              </div>
              
              {/* Table Body */}
              {caseStudies.map((study, index) => (
                <div 
                  key={study.id} 
                  className={`md:grid md:grid-cols-5 border-b border-[1px] border-gray-300 ${index % 2 === 1 ? 'bg-[#F9FAFB]' : 'bg-white'} ${
                    study.status === 'completed' 
                      ? 'hover:bg-[#F9FAFB] hover:shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out cursor-pointer' 
                      : ''
                  } last:border-b-0`}
                  onClick={() => handleRowClick(study)}
                >
                  {/* Mobile Card Layout */}
                  <div className="md:hidden p-4 flex flex-col space-y-3">
                    <div className="flex items-center">
                      <div 
                        className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center text-[14px] font-bold text-white flex-shrink-0" 
                        style={{ backgroundColor: clientColors[study.shortName] }}
                      >
                        {study.shortName}
                      </div>
                      <div className="ml-3 flex flex-col justify-center">
                        <div className="text-[16px] font-semibold text-black leading-tight">{study.name}</div>
                        <div className="text-[13px] text-[#6B7280] leading-tight mt-[4px]">{study.industry}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex flex-col">
                        <div className="text-[13px] font-medium text-[#6B7280]">Traffic Increase</div>
                        <div className="text-[16px] font-bold text-black">{study.trafficIncrease}</div>
                        <div className="text-[12px] text-[#6B7280]">{study.trafficRange}</div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="text-[13px] font-medium text-[#6B7280]">Links Built</div>
                        <div className="text-[16px] font-bold text-black">{study.linksBuilt}</div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="text-[13px] font-medium text-[#6B7280]">Timeframe</div>
                        <div className="text-[14px] font-medium text-black">{study.timeframe}</div>
                      </div>
                      
                      <div className="flex flex-col justify-end">
                        {study.status === 'completed' ? (
                          <Link 
                            href={`/case-studies/${slugMap[study.id] || study.id}`}
                            className="px-4 py-[6px] bg-black text-white text-[14px] font-medium rounded-[4px] text-center hover:bg-[#111111] transition-colors duration-200 ease-in-out w-full"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Case
                          </Link>
                        ) : (
                          <button className="px-4 py-[6px] bg-white border-[1px] border-gray-300 text-[#6B7280] text-[14px] font-medium rounded-[4px] w-full">
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                
                  {/* Desktop Layout - Hidden on Mobile */}
                  <div className="hidden md:flex px-4 items-center h-[72px]">
                    <div 
                      className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center text-[14px] font-bold text-white flex-shrink-0" 
                      style={{ backgroundColor: clientColors[study.shortName] }}
                    >
                      {study.shortName}
                    </div>
                    <div className="ml-3 flex flex-col justify-center">
                      <div className="text-[16px] font-semibold text-black leading-tight">{study.name}</div>
                      <div className="text-[13px] text-[#6B7280] leading-tight mt-[4px]">{study.industry}</div>
                    </div>
                  </div>
                  
                  {/* Traffic Increase Column - Desktop Only */}
                  <div className="hidden md:flex flex-col justify-center items-center h-[72px]">
                    <div className="text-[18px] font-bold text-black">{study.trafficIncrease}</div>
                    <div className="text-[13px] text-[#6B7280] mt-[4px]">{study.trafficRange}</div>
                  </div>
                  
                  {/* Links Built Column - Desktop Only */}
                  <div className="hidden md:flex items-center justify-center h-[72px]">
                    <div className="text-[18px] font-bold text-black">{study.linksBuilt}</div>
                  </div>
                  
                  {/* Timeframe Column - Desktop Only */}
                  <div className="hidden md:flex items-center justify-center h-[72px]">
                    <div className="text-[15px] font-medium text-black">{study.timeframe}</div>
                  </div>
                  
                  {/* Actions Column - Desktop Only */}
                  <div className="hidden md:flex items-center justify-center h-[72px]">
                    {study.status === 'completed' ? (
                      <Link 
                        href={`/case-studies/${slugMap[study.id] || study.id}`}
                        className="px-4 py-[6px] bg-black text-white text-[14px] font-medium rounded-[4px] hover:bg-[#111111] transition-colors duration-200 ease-in-out"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Case
                      </Link>
                    ) : (
                      <button className="px-4 py-[6px] bg-white border-[1px] border-gray-300 text-[#6B7280] text-[14px] font-medium rounded-[4px]">
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8 mb-6">
            <div className="flex space-x-2">
              <Link href="#" 
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black">
                1
              </Link>
              <Link href="#"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black">
                2
              </Link>
              <Link href="#"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] bg-black border-[2.5px] border-black text-[14px] font-medium text-white">
                3
              </Link>
              <Link href="#"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black">
                4
              </Link>
              <Link href="#"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black">
                5
              </Link>
              <Link href="#"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black">
                6
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
