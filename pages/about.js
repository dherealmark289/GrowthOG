import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { useState } from 'react';

export default function About() {
  const [activeSideTab, setActiveSideTab] = useState('Our Team');
  
  const teamMembers = [
    {
      id: 1,
      name: 'Mark Quadros',
      role: 'Founder CEO',
      letter: 'M',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'SEO Director',
      letter: 'S',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 3,
      name: 'Alex Chen',
      role: 'Link Strategy Lead',
      letter: 'A',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 4,
      name: 'Maria Rodriguez',
      role: 'Content Director',
      letter: 'M',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Client Success Lead',
      letter: 'D',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 6,
      name: 'Priya Patel',
      role: 'Content Strategist',
      letter: 'P',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 7,
      name: 'James Wilson',
      role: 'Technical SEO',
      letter: 'J',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 8,
      name: 'Emma Thompson',
      role: 'Outreach Specialist',
      letter: 'E',
      socialLinks: { linkedin: '#', twitter: '#' }
    },
    {
      id: 9,
      name: 'Michael Brown',
      role: 'Data Analyst',
      letter: 'M',
      socialLinks: { linkedin: '#', twitter: '#' }
    }
  ];

  return (
    <Layout
      seo={{
        title: 'About Us | GrowthOG',
        description: 'Meet the SEO and link-building experts behind GrowthOG.',
      }}
    >
      <div className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Team Section */}
            <div className="border-[2.5px] border-black rounded-lg overflow-hidden">
              <div className="flex">
                {/* Left Sidebar Navigation */}
                <div className="w-52 bg-white border-r-[2.5px] border-black">
                  <div className="py-6">
                    <button
                      className={`block w-full text-left px-6 py-3 ${activeSideTab === 'Our Team' ? 'bg-black text-white' : 'hover:bg-secondary-50'}`}
                      onClick={() => setActiveSideTab('Our Team')}
                    >
                      Our Team
                    </button>
                    <button
                      className={`block w-full text-left px-6 py-3 ${activeSideTab === 'Our Story' ? 'bg-black text-white' : 'hover:bg-secondary-50'}`}
                      onClick={() => setActiveSideTab('Our Story')}
                    >
                      Our Story
                    </button>
                    <button
                      className={`block w-full text-left px-6 py-3 ${activeSideTab === 'Global Presence' ? 'bg-black text-white' : 'hover:bg-secondary-50'}`}
                      onClick={() => setActiveSideTab('Global Presence')}
                    >
                      Global Presence
                    </button>
                    <button
                      className={`block w-full text-left px-6 py-3 ${activeSideTab === 'Our Values' ? 'bg-black text-white' : 'hover:bg-secondary-50'}`}
                      onClick={() => setActiveSideTab('Our Values')}
                    >
                      Our Values
                    </button>
                    <button
                      className={`block w-full text-left px-6 py-3 ${activeSideTab === 'Join Us' ? 'bg-black text-white' : 'hover:bg-secondary-50'}`}
                      onClick={() => setActiveSideTab('Join Us')}
                    >
                      Join Us
                    </button>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 p-8">
                  <h2 className="text-3xl font-bold mb-2">Our Team</h2>
                  <p className="text-secondary-600 mb-8">
                    The SEO and link-building experts behind GrowthOG
                  </p>

                  {/* Team Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="border-[2.5px] border-black rounded-lg p-4">
                        <div className="flex justify-center mb-4">
                          <div className="h-16 w-16 rounded-full bg-secondary-100 flex items-center justify-center text-xl font-medium">
                            {member.letter}
                          </div>
                        </div>
                        <h3 className="text-center font-bold mb-1">{member.name}</h3>
                        <p className="text-center text-secondary-600 text-sm mb-4">{member.role}</p>
                        <div className="flex justify-center space-x-3">
                          <a href={member.socialLinks.linkedin} className="text-secondary-600 hover:text-primary-600">
                            <span className="inline-block w-6 h-6 bg-secondary-100 rounded-full text-center leading-6 text-xs">in</span>
                          </a>
                          <a href={member.socialLinks.twitter} className="text-secondary-600 hover:text-primary-600">
                            <span className="inline-block w-6 h-6 bg-secondary-100 rounded-full text-center leading-6 text-xs">tw</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t-[2.5px] border-black py-8">
        <div className="container-custom">
          <div className="flex justify-center">
            <nav className="inline-flex shadow-sm -space-x-px">
              <Link href="/" className="relative inline-flex items-center px-4 py-2 border-[2.5px] border-black bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                1
              </Link>
              <Link href="/services" className="relative inline-flex items-center px-4 py-2 border-[2.5px] border-black bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                2
              </Link>
              <Link href="/pricing" className="relative inline-flex items-center px-4 py-2 border-[2.5px] border-black bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                3
              </Link>
              <Link href="/resources" className="relative inline-flex items-center px-4 py-2 border-[2.5px] border-black bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                4
              </Link>
              <Link href="/case-studies" className="relative inline-flex items-center px-4 py-2 border-[2.5px] border-black bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                5
              </Link>
              <Link href="/about-us" className="relative inline-flex items-center px-4 py-2 border-[2.5px] border-black bg-black text-sm font-medium text-white">
                6
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
}
