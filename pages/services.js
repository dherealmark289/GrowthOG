import Layout from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Services() {
  const [activeTab, setActiveTab] = useState('EARLY-STAGE');
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

  const tabs = {
    'EARLY-STAGE': {
      description: 'Our strategic approach to building high-authority links for early-stage SaaS brands',
      content: [
        {
          number: '1',
          title: 'Discovery',
          description: 'We analyze your current SEO performance and identify quick-win opportunities with limited resources.',
          deliverables: [
            'SEO Performance Audit focused on competitive gaps',
            'Content & Keyword Opportunity Analysis',
            'Growth Roadmap aligned with fundraising timelines'
          ]
        },
        {
          number: '2',
          title: 'Strategy',
          description: 'We build a foundational link strategy optimized for immediate growth needs and budget constraints.',
          deliverables: [
            'Link Priority Framework for maximum ROI',
            'Content Gap Assessment for quick ranking wins',
            'Target Site Selection focused on industry relevance'
          ]
        },
        {
          number: '3',
          title: 'Execution',
          description: 'We implement focused link campaigns that establish your authority footprint in the niche.',
          deliverables: [
            'Strategic SEO-driven links to prove channel viability',
            'Placement Reports with performance projections',
            'Live Link Monitoring to ensure quality standards'
          ]
        },
        {
          number: '4',
          title: 'Reporting',
          description: 'We track traction and optimize strategy to help SEO become an investor-ready growth lever.',
          deliverables: [
            'Growth Validation Reports for investor decks',
            'Rankings & Traffic Analysis with benchmarks',
            'Strategy Optimization based on CAC:LTV'
          ]
        }
      ]
    },
    'HIGH-GROWTH': {
      description: 'Our strategic approach to scaling link authority for high-growth SaaS brands',
      content: [
        {
          number: '1',
          title: 'Discovery',
          description: 'We audit your SEO infrastructure and identify scalable growth opportunities across your content ecosystem.',
          deliverables: [
            'Comprehensive SEO Performance Audit',
            'Competitor Gap Analysis with market positioning insights',
            'Cross-channel Growth Alignment Strategy'
          ]
        },
        {
          number: '2',
          title: 'Strategy',
          description: 'We design a balanced link strategy optimized for rankings, authority, and operational scalability.',
          deliverables: [
            'Multi-tier Link Priority Framework',
            'Content Ecosystem Assessment for link magnetism',
            'Strategic Target Site Selection across verticals'
          ]
        },
        {
          number: '3',
          title: 'Execution',
          description: 'We implement editorial campaigns that build authority and support thought leadership.',
          deliverables: [
            'Diversified High-Authority Backlink Portfolio',
            'Detailed Placement Reports with attribution metrics',
            'Advanced Link Monitoring & Competitive Tracking'
          ]
        },
        {
          number: '4',
          title: 'Reporting',
          description: 'We provide reporting that aligns with pipeline performance, growth goals, and content ROI.',
          deliverables: [
            'Pipeline-Focused Performance Reports',
            'Multi-channel Attribution Analysis',
            'Quarterly Strategy Optimization & Forecasting'
          ]
        }
      ]
    },
    'ESTABLISHED': {
      description: 'Our strategic approach to maintaining industry-leading link authority for enterprise SaaS brands',
      content: [
        {
          number: '1',
          title: 'Discovery',
          description: 'We assess your market position and uncover strategic link opportunities to sustain leadership.',
          deliverables: [
            'Enterprise SEO Performance Audit',
            'Market Leadership Gap Analysis',
            'Cross-department Alignment Strategy'
          ]
        },
        {
          number: '2',
          title: 'Strategy',
          description: 'We build a sophisticated link authority strategy optimized for brand credibility and dominance.',
          deliverables: [
            'Enterprise Link Authority Framework',
            'Content Leadership Assessment',
            'Strategic Partner & Publication Selection'
          ]
        },
        {
          number: '3',
          title: 'Execution',
          description: 'We execute premium link campaigns that support enterprise trust and executive visibility.',
          deliverables: [
            'Premium Publication Backlink Portfolio',
            'Executive Placement Reports',
            'Enterprise Link Health Monitoring'
          ]
        },
        {
          number: '4',
          title: 'Reporting',
          description: 'We deliver holistic reporting tied to visibility, market share, and brand metrics.',
          deliverables: [
            'Executive-Ready Performance Dashboards',
            'Market Share & Authority Analysis',
            'Strategy Optimization focused on brand dominance'
          ]
        }
      ]
    }
  };

  return (
    <Layout
      seo={{
        title: 'Services | GrowthOG',
        description: 'Strategic link building for SaaS brands at every stage of growth.',
      }}
    >
      <div className="py-10">
        <div className="max-w-[1280px] mx-auto px-8">
          {/* How We Work Section */}
          <div className="border-[2.5px] border-black rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-white p-8 md:p-[32px]">
            <h1 className="text-[48px] font-extrabold text-black leading-[1.1]">How We Work</h1>
            <p className="text-[20px] font-normal text-[#4B5563] leading-[1.4] mt-4 mb-10">
              Our strategic approach to building high-authority links for SaaS brands
            </p>

            {/* Tabs - Desktop */}
            {!isMobile && (
              <div className="h-[60px] border-[2.5px] border-black rounded-[8px] overflow-hidden mb-6 flex">
                <button
                  className={`w-1/3 h-full flex items-center justify-center font-semibold text-[16px] uppercase transition-colors duration-200 ${
                    activeTab === 'EARLY-STAGE' ? 'bg-black text-white' : 'bg-white text-[#6B7280] hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('EARLY-STAGE')}
                >
                  EARLY-STAGE
                </button>
                <button
                  className={`w-1/3 h-full flex items-center justify-center font-semibold text-[16px] uppercase border-x-[2.5px] border-black transition-colors duration-200 ${
                    activeTab === 'HIGH-GROWTH' ? 'bg-black text-white' : 'bg-white text-[#6B7280] hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('HIGH-GROWTH')}
                >
                  HIGH-GROWTH
                </button>
                <button
                  className={`w-1/3 h-full flex items-center justify-center font-semibold text-[16px] uppercase transition-colors duration-200 ${
                    activeTab === 'ESTABLISHED' ? 'bg-black text-white' : 'bg-white text-[#6B7280] hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('ESTABLISHED')}
                >
                  ESTABLISHED
                </button>
              </div>
            )}
            
            {/* Dropdown Selector - Mobile */}
            {isMobile && (
              <div className="mb-6">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full h-[60px] border-[2.5px] border-black rounded-[8px] bg-white text-black font-semibold px-4 appearance-none relative"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='black'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  <option value="EARLY-STAGE">EARLY-STAGE</option>
                  <option value="HIGH-GROWTH">HIGH-GROWTH</option>
                  <option value="ESTABLISHED">ESTABLISHED</option>
                </select>
              </div>
            )}

            <p className="text-[18px] font-medium text-black leading-[1.5] mb-8">
              {tabs[activeTab].description}
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tabs[activeTab].content.map((item) => (
                <div 
                  key={item.number} 
                  className="border-[2.5px] border-black rounded-[8px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow duration-200 bg-white flex flex-col"
                >
                  <div className="mb-4">
                    <div className="w-[40px] h-[40px] bg-black text-white rounded-full flex items-center justify-center mb-4">
                      <span className="text-[18px] font-semibold">{item.number}</span>
                    </div>
                    <h3 className="text-[24px] font-bold text-black leading-[1.3] mb-4">{item.title}</h3>
                    <p className="text-[16px] font-normal text-[#4B5563] leading-[1.5] mb-5">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <h4 className="text-[18px] font-bold text-black mb-4">Deliverables:</h4>
                    <ul className="space-y-3">
                      {item.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-[18px] w-[18px] text-black mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[15px] font-medium text-black leading-[1.5]">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t-[2.5px] border-black py-10">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <Link href="/" 
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
                1
              </Link>
              <Link href="/services"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] bg-black border-[2.5px] border-black text-[14px] font-medium text-white">
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
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
                6
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
