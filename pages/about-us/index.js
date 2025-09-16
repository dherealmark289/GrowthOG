import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { useState } from 'react';

export default function AboutUs() {
  const [activeSideTab, setActiveSideTab] = useState('Our Team');
  
  const teamMembers = [
    {
      id: 1,
      name: 'Mark Quadros',
      role: 'Founder CEO',
      initial: 'M',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'SEO Director',
      initial: 'S',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 3,
      name: 'Alex Chen',
      role: 'Link Strategy Lead',
      initial: 'A',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 4,
      name: 'Maria Rodriguez',
      role: 'Content Director',
      initial: 'M',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Client Success Lead',
      initial: 'D',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 6,
      name: 'Priya Patel',
      role: 'Content Strategist',
      initial: 'P',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 7,
      name: 'James Wilson',
      role: 'Technical SEO',
      initial: 'J',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 8,
      name: 'Emma Thompson',
      role: 'Outreach Specialist',
      initial: 'E',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 9,
      name: 'Michael Brown',
      role: 'Data Analyst',
      initial: 'M',
      socialLinks: { linkedin: '#', twitter: '#' }
    }
  ];

  const paginationItems = [1, 2, 3, 4, 5, 6];

  return (
    <Layout
      seo={{
        title: 'About Us | GrowthOG',
        description: 'Meet the SEO and link-building experts behind GrowthOG.',
        canonical: 'https://growthog.com/about-us/'
      }}
    >
      <div className="bg-[#F9FAFB] py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8">
            <div className="flex flex-col md:flex-row">
              {/* Left Sidebar */}
              <div className="w-full md:w-[170px] bg-black rounded-lg mr-0 md:mr-6 mb-6 md:mb-0">
                <nav>
                  <ul>
                    <li>
                      <button
                        className="w-full h-[56px] px-4 text-left bg-white text-black font-semibold text-[16px]"
                        onClick={() => setActiveSideTab('Our Team')}
                      >
                        Our Team
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full h-[56px] px-4 text-left bg-black text-white hover:bg-gray-900 text-[16px]"
                        onClick={() => setActiveSideTab('Our Story')}
                      >
                        Our Story
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full h-[56px] px-4 text-left bg-black text-white hover:bg-gray-900 text-[16px]"
                        onClick={() => setActiveSideTab('Global Presence')}
                      >
                        Global Presence
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full h-[56px] px-4 text-left bg-black text-white hover:bg-gray-900 text-[16px]"
                        onClick={() => setActiveSideTab('Our Values')}
                      >
                        Our Values
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full h-[56px] px-4 text-left bg-black text-white hover:bg-gray-900 text-[16px]"
                        onClick={() => setActiveSideTab('Join Us')}
                      >
                        Join Us
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="text-[32px] font-extrabold text-black">Our Team</h1>
                  <p className="text-[16px] text-[#6B7280]">The SEO and link building experts behind GrowthOG</p>
                </div>
                
                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="border border-[#E5E7EB] rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col items-center">
                        <div className="bg-[#F3F4F6] rounded-full h-10 w-10 flex items-center justify-center">
                          <span className="text-[18px] font-semibold">{member.initial}</span>
                        </div>
                        <h3 className="mt-4 text-[18px] font-bold text-black">{member.name}</h3>
                        <p className="mt-1 text-[14px] text-[#6B7280] text-center">{member.role}</p>
                        
                        {/* Social icons */}
                        <div className="flex mt-4 space-x-2">
                          <a href={member.socialLinks.linkedin} className="bg-[#F3F4F6] rounded-full h-8 w-8 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                          <a href={member.socialLinks.twitter} className="bg-[#F3F4F6] rounded-full h-8 w-8 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    {paginationItems.map((page) => (
                      <button
                        key={page}
                        className={`w-9 h-9 flex items-center justify-center rounded-md border ${
                          page === 1 ? 'border-black' : 'border-[#E5E7EB]'
                        } text-[14px] font-medium hover:bg-gray-50`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}