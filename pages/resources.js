import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('Blog'); // Default to Blog tab
  const [selectedTopics, setSelectedTopics] = useState('All Topics');
  const [selectedStage, setSelectedStage] = useState('SaaS Stage');
  const [selectedContentType, setSelectedContentType] = useState('Content Type');
  const [selectedDate, setSelectedDate] = useState('Date');
  
  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle filter changes
  const handleTopicChange = (e) => setSelectedTopics(e.target.value);
  const handleStageChange = (e) => setSelectedStage(e.target.value);
  const handleContentTypeChange = (e) => setSelectedContentType(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  
  // Predefined article data to match the reference screenshot
  const articlesData = [
    {
      id: 1,
      category: 'LINK BUILDING',
      title: 'Top Linkable Assets That Drive Quality Backlinks for Your Strategy',
      excerpt: 'Even if you produce high-quality content on your website, there is no guarantee that it will receive external backlinks. While it is not impossible, there are ways to...',
      author: 'Barbara Manuel',
      date: 'March 15, 2025',
      rawDate: '2025-03-15',
      stage: 'Growth Stage',
      contentType: 'Guide',
      authorImage: '/user-avatar.png'
    },
    {
      id: 2,
      category: 'LINK BUILDING',
      title: 'Bad Backlinks: Identify, Remove, and Protect Your Site\'s SEO Health',
      excerpt: 'Bad backlinks can severely damage your SEO, dragging down ranking potential and exposing your site to penalties. Whether from malicious sources or low-quality domains, these harmful links...',
      author: 'Barbara Manuel',
      date: 'March 16, 2025',
      rawDate: '2025-03-16',
      stage: 'Mature Stage',
      contentType: 'Case Study',
      authorImage: '/user-avatar.png'
    },
    {
      id: 3,
      category: 'LINK BUILDING',
      title: 'Top Link Building Strategies to Boost Your SEO Results in 2025',
      excerpt: 'Creating compelling content is an undeniable challenge, yet the real uphill battle begins when you try to secure links to it. Building links can be a...',
      author: 'Mark Danielle',
      date: 'November 5, 2024',
      rawDate: '2024-11-05',
      stage: 'Early Stage',
      contentType: 'Article',
      authorImage: '/user-avatar.png'
    },
    {
      id: 4,
      category: 'LINK BUILDING',
      title: 'Relevant Backlinks: The Ultimate Guide to Build Contextual Backlinks in 2025',
      excerpt: 'Have you ever wondered why some websites consistently maintain their rankings on search engine results pages (SERPs) while others struggle? The secret...',
      author: 'Russell Simale',
      date: 'November 5, 2024',
      rawDate: '2024-11-05',
      stage: 'Growth Stage',
      contentType: 'Guide',
      authorImage: '/user-avatar.png'
    },
    {
      id: 5,
      category: 'LINK BUILDING',
      title: 'The Ultimate Guide to Mastering Link Building Outreach in 2025',
      excerpt: 'In 2025, link building remains a powerhouse for online growth, with 43% of SEO experts naming it as their top strategy for success. But mastering link...',
      author: 'Barbara Manuel',
      date: 'November 3, 2024',
      rawDate: '2024-11-03',
      stage: 'Mature Stage',
      contentType: 'Article',
      authorImage: '/user-avatar.png'
    },
    {
      id: 6,
      category: 'LINK BUILDING',
      title: 'What Are Sitewide Links? (+ Their Impact on SEO)',
      excerpt: 'Sitewide links—those recurring hyperlinks found in a website\'s footer, sidebar, or navigation—can either be a golden ticket for boosting your site\'s ranking visibility, or Th...',
      author: 'Russell Simale',
      date: 'February 28, 2025',
      rawDate: '2025-02-28',
      stage: 'Early Stage',
      contentType: 'Webinar',
      authorImage: '/user-avatar.png'
    }
  ];

  // Filter articles based on selected filters
  const filterArticles = () => {
    // Clone the original array to avoid modifying it
    let filteredArticles = [...articlesData];
    
    // Apply topic filter
    if (selectedTopics !== 'All Topics') {
      filteredArticles = filteredArticles.filter(article => 
        article.category.includes(selectedTopics.toUpperCase()));
    }
    
    // Apply content type filter
    if (selectedContentType !== 'Content Type') {
      filteredArticles = filteredArticles.filter(article => 
        article.contentType === selectedContentType);
    }
    
    // Apply SaaS stage filter
    if (selectedStage !== 'SaaS Stage') {
      filteredArticles = filteredArticles.filter(article => 
        article.stage === selectedStage);
    }
    
    // Apply date filter
    if (selectedDate !== 'Date') {
      const today = new Date();
      let dateThreshold = new Date();
      
      switch (selectedDate) {
        case 'Last 7 days':
          dateThreshold.setDate(today.getDate() - 7);
          break;
        case 'Last 30 days':
          dateThreshold.setDate(today.getDate() - 30);
          break;
        case 'Last 3 months':
          dateThreshold.setMonth(today.getMonth() - 3);
          break;
        case 'Last year':
          dateThreshold.setFullYear(today.getFullYear() - 1);
          break;
      }
      
      filteredArticles = filteredArticles.filter(article => {
        const articleDate = new Date(article.rawDate);
        return articleDate >= dateThreshold;
      });
    }
    
    return filteredArticles;
  };
  
  // Get filtered articles
  const articles = filterArticles();

  return (
    <Layout
      seo={{
        title: 'Resources | GrowthOG',
        description: 'Expert insights on SEO, link-building, and SaaS growth',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="border-[2.5px] border-black rounded-[12px] mt-4 mb-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Mobile Tab Selector - Only visible on mobile */}
            <div className="sm:hidden border-b-[2.5px] border-black">
              <div className="flex">
                <button
                  className={`flex-1 py-3 px-4 text-center uppercase text-[14px] font-semibold ${activeTab === 'Blog' ? 'bg-black text-white' : 'bg-black/90 text-[#94A3B8]'}`}
                  onClick={() => handleTabChange('Blog')}
                >
                  Blog
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center uppercase text-[14px] font-semibold ${activeTab === 'Tools' ? 'bg-black text-white' : 'bg-black/90 text-[#94A3B8]'}`}
                  onClick={() => handleTabChange('Tools')}
                >
                  Tools
                </button>
              </div>
            </div>
            
            {/* Left Sidebar Navigation - Only visible on desktop */}
            <div className="hidden sm:flex w-[80px] bg-black flex-col">
              <div 
                className={`h-[120px] flex items-center justify-center cursor-pointer hover:bg-black/80 ${activeTab === 'Blog' ? 'bg-black' : 'bg-black/90'}`}
                onClick={() => handleTabChange('Blog')}
              >
                <div className="transform rotate-90 uppercase text-[14px] font-semibold text-white">
                  Blog
                </div>
              </div>
              <div 
                className={`h-[120px] flex items-center justify-center cursor-pointer hover:bg-black/80 ${activeTab === 'Tools' ? 'bg-black' : 'bg-black/90'}`}
                onClick={() => handleTabChange('Tools')}
              >
                <div className="transform rotate-90 uppercase text-[14px] font-semibold text-[#94A3B8]">
                  Tools
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="p-4 sm:p-6">
                {/* Header Section */}
                <div className="border-b-[2.5px] border-black pb-4 mb-6">
                  <h1 className="text-[32px] font-extrabold text-black leading-[1.2]">Resources</h1>
                  <p className="text-[16px] font-normal text-[#6B7280] leading-[1.5] mt-2">
                    Expert insights on SEO, link-building, and SaaS growth
                  </p>
                </div>

                {/* Blog Content - Visible when activeTab is Blog */}
                {activeTab === 'Blog' && (
                  <>
                    {/* Filter Bar - Only visible for Blog content */}
                    <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center bg-white border-[2.5px] border-black rounded-[6px] px-4 py-3 mb-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto mb-4 sm:mb-0">
                        <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start mb-2 sm:mb-0">
                          <span className="text-[14px] font-semibold text-black">Filter by:</span>
                          
                          {/* Mobile filter toggle button */}
                          <button 
                            className="sm:hidden border-[1.5px] border-black rounded-md px-2 py-1 text-xs font-medium"
                            onClick={() => {
                              // Toggle all filters visibility on mobile
                              const filtersEl = document.getElementById('mobile-filters');
                              if (filtersEl) {
                                filtersEl.classList.toggle('hidden');
                              }
                            }}
                          >
                            Filters
                            <svg className="inline-block ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Mobile filters - hidden by default */}
                        <div id="mobile-filters" className="flex flex-col sm:flex-row w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-3 hidden sm:flex">
                          <select 
                            className="border-[2.5px] border-[#E5E7EB] rounded-[4px] py-2 px-3 text-[14px] text-black bg-white w-full sm:w-auto"
                            value={selectedTopics}
                            onChange={handleTopicChange}
                          >
                            <option value="All Topics">All Topics</option>
                            <option value="Link Building">Link Building</option>
                            <option value="SEO">SEO</option>
                            <option value="Content Marketing">Content Marketing</option>
                            <option value="Analytics">Analytics</option>
                          </select>
                          
                          <select 
                            className="border-[2.5px] border-[#E5E7EB] rounded-[4px] py-2 px-3 text-[14px] text-black bg-white w-full sm:w-auto"
                            value={selectedStage}
                            onChange={handleStageChange}
                          >
                            <option value="SaaS Stage">SaaS Stage</option>
                            <option value="Early Stage">Early Stage</option>
                            <option value="Growth Stage">Growth Stage</option>
                            <option value="Mature Stage">Mature Stage</option>
                          </select>
                          
                          <select 
                            className="border-[2.5px] border-[#E5E7EB] rounded-[4px] py-2 px-3 text-[14px] text-black bg-white w-full sm:w-auto"
                            value={selectedContentType}
                            onChange={handleContentTypeChange}
                          >
                            <option value="Content Type">Content Type</option>
                            <option value="Article">Article</option>
                            <option value="Guide">Guide</option>
                            <option value="Case Study">Case Study</option>
                            <option value="Webinar">Webinar</option>
                            <option value="Tool">Tool</option>
                          </select>
                          
                          <select 
                            className="border-[2.5px] border-[#E5E7EB] rounded-[4px] py-2 px-3 text-[14px] text-black bg-white w-full sm:w-auto"
                            value={selectedDate}
                            onChange={handleDateChange}
                          >
                            <option value="Date">Date</option>
                            <option value="Last 7 days">Last 7 days</option>
                            <option value="Last 30 days">Last 30 days</option>
                            <option value="Last 3 months">Last 3 months</option>
                            <option value="Last year">Last year</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="relative w-full sm:w-auto mt-3 sm:mt-0">
                        <input 
                          type="text" 
                          placeholder="Search Resources" 
                          className="border-[2.5px] border-[#E5E7EB] rounded-[4px] pl-9 py-2 pr-3 w-full sm:w-[200px] text-[14px]"
                        />
                        <svg 
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-[16px] w-[16px] text-[#6B7280]" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                    </div>

                    {/* Featured Resource Box */}
                    <div className="flex flex-col md:flex-row border-[2.5px] border-black rounded-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden mb-6">
                      {/* Left Section */}
                      <div className="bg-[#0F172A] text-white p-4 sm:p-6 w-full md:w-[40%]">
                        <div className="text-[12px] font-semibold uppercase opacity-70 mb-2">SALES ENABLEMENT GUIDE</div>
                        <h2 className="text-[20px] sm:text-[24px] font-bold text-white leading-[1.3] mb-3">
                          Link-Building Decision Framework for SaaS
                        </h2>
                        <button className="border-[2.5px] border-white rounded-[4px] px-4 py-2 text-[14px] font-semibold text-white mt-3 sm:mt-4 hover:bg-white hover:bg-opacity-10 transition-colors w-full sm:w-auto text-center">
                          Download Guide
                        </button>
                      </div>
                      
                      {/* Right Section */}
                      <div className="bg-white p-4 sm:p-6 w-full md:w-[60%]">
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-black leading-[1.3] mb-3">
                          Are You Investing in the Right Links?
                        </h3>
                        <p className="text-[14px] sm:text-[15px] text-[#4B5563] leading-[1.5] mb-3 sm:mb-4">
                          A strategic framework to help B2B SaaS growth teams decide which links to focus on based on their growth stage, budget, and business goals. Stop wasting budget on the wrong links.
                        </p>
                        <div className="text-[12px] sm:text-[13px] text-[#6B7280] mt-3 sm:mt-4">
                          5,280 Downloads • 27 min read
                        </div>
                      </div>
                    </div>

                    {/* Popular Link Building Articles Section */}
                    <div className="mb-4">
                      <h2 className="text-[24px] font-bold text-black leading-[1.3]">Popular Link Building Articles</h2>
                      <p className="text-[16px] text-[#6B7280] leading-[1.5] mb-6">
                        Expert guides on effective link building strategies for SaaS companies
                      </p>

                      {/* Articles Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {articles.map(article => (
                          <div 
                            key={article.id} 
                            className="border-[2.5px] border-black rounded-[8px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow duration-200"
                          >
                            <div className="text-[12px] font-semibold text-[#2563EB] uppercase mb-2">
                              {article.category}
                            </div>
                            <h3 className="text-[18px] font-bold text-black leading-[1.3] mb-3">
                              <a href="#" className="hover:text-[#2563EB]">
                                {article.title}
                              </a>
                            </h3>
                            <p className="text-[15px] text-[#4B5563] leading-[1.5] mb-4">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center mt-4">
                              <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 overflow-hidden">
                                {/* Placeholder avatar */}
                                <div className="w-full h-full bg-gray-300"></div>
                              </div>
                              <span className="text-[13px] font-medium text-black mr-2">{article.author}</span>
                              <span className="text-[13px] text-[#6B7280]">• {article.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Tools Content - Visible when activeTab is Tools */}
                {activeTab === 'Tools' && (
                  <div id="tools-section" className="mb-8">
                    <h2 className="text-[24px] font-bold text-black leading-[1.3]">Link Building Tools</h2>
                    <p className="text-[16px] text-[#6B7280] leading-[1.5] mb-6">
                      Free tools to help you plan and execute effective link building campaigns
                    </p>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Link Audit Tool */}
                      <div className="border-[2.5px] border-black rounded-[8px] p-6 h-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] cursor-not-allowed opacity-80">
                        <div className="bg-black/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                          </svg>
                        </div>
                        <h3 className="text-[18px] font-bold text-black leading-[1.3] mb-2">Link Audit Tool</h3>
                        <p className="text-[15px] text-[#4B5563] leading-[1.5]">
                          Coming soon
                        </p>
                      </div>

                      {/* Link Building ROI Calculator */}
                      <div className="border-[2.5px] border-black rounded-[8px] p-6 h-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] cursor-not-allowed opacity-80">
                        <div className="bg-black/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <h3 className="text-[18px] font-bold text-black leading-[1.3] mb-2">Link Building ROI Calculator</h3>
                        <p className="text-[15px] text-[#4B5563] leading-[1.5]">
                          Coming soon
                        </p>
                      </div>

                      {/* Campaign Builder */}
                      <Link href="/dashboard">
                        <div className="border-[2.5px] border-black rounded-[8px] p-6 h-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow duration-200 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div className="bg-black/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                              </svg>
                            </div>
                            <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                          </div>
                          <h3 className="text-[18px] font-bold text-black leading-[1.3] mb-2">Campaign Builder</h3>
                          <p className="text-[15px] text-[#4B5563] leading-[1.5]">
                            Plan and track your link building campaigns from a single dashboard.
                          </p>
                        </div>
                      </Link>

                      {/* More Tools Coming Soon */}
                      <div className="border-[2.5px] border-black rounded-[8px] p-6 h-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] cursor-default">
                        <div className="bg-black/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                        </div>
                        <h3 className="text-[18px] font-bold text-black leading-[1.3] mb-2">More Tools Coming Soon</h3>
                        <p className="text-[15px] text-[#4B5563] leading-[1.5]">
                          We're working on more tools to help you with your link building efforts.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-4">
          <div className="flex space-x-2">
            <Link href="/" 
              className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] bg-black border-[2.5px] border-black text-[14px] font-medium text-white">
              1
            </Link>
            <Link href="/services"
              className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
              2
            </Link>
            <Link href="/case-studies"
              className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
              3
            </Link>
            <Link href="/pricing"
              className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
              4
            </Link>
            <Link href="/resources"
              className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
              5
            </Link>
            <Link href="/about-us"
              className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-[#E5E7EB] text-[14px] font-medium text-black hover:bg-gray-50">
              6
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}