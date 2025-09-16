import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DashboardMainLayout from '../../components/dashboard/DashboardMainLayout';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

export default function LinkProgress() {
  const [timeFilter, setTimeFilter] = useState('All Time');

  // Sample metrics data
  const metrics = {
    totalLinks: { value: 27, change: '+4 this month' },
    liveLinks: { value: 19, rate: '70% success rate' },
    pendingLinks: { value: 8, estimate: 'Expected in 7-14 days' },
    avgDomainRating: { value: 58, change: '+2 points from last month' }
  };
  
  // Sample link data
  const links = [
    {
      id: 1,
      date: '05/01/2025',
      domain: 'techblog.com',
      dr: 89,
      linkFrom: 'techblog.com/reviews',
      linkTo: 'example.com/product',
      anchorText: 'best project management',
      status: 'Live',
      type: 'Editorial'
    },
    {
      id: 2,
      date: '20/03/2025',
      domain: 'productivityguide.com',
      dr: 52,
      linkFrom: 'productivityguide.com/tools',
      linkTo: 'example.com/features',
      anchorText: 'top features to look for',
      status: 'Submitted',
      type: 'Guest Post'
    },
    {
      id: 3,
      date: '22/03/2025',
      domain: 'marketingnews.ca',
      dr: 71,
      linkFrom: 'marketingnews.ca/boss-brands',
      linkTo: 'example.com/solutions',
      anchorText: 'enterprise solutions',
      status: 'Progress',
      type: 'Editorial'
    },
    {
      id: 4,
      date: '28/03/2025',
      domain: 'businessdaily.net',
      dr: 63,
      linkFrom: 'businessdaily.net/resources',
      linkTo: 'example.com/case-studies',
      anchorText: 'success stories',
      status: 'Revised',
      type: 'Guest Post'
    },
    {
      id: 5,
      date: '10/02/2025',
      domain: 'techblog.com',
      dr: 86,
      linkFrom: 'techblog.com/software',
      linkTo: 'example.com/software',
      anchorText: 'software solutions',
      status: 'Live',
      type: 'Editorial'
    },
    {
      id: 6,
      date: '18/02/2025',
      domain: 'digitaltrends.net',
      dr: 74,
      linkFrom: 'digitaltrends.net/business',
      linkTo: 'example.com/business',
      anchorText: 'business tools',
      status: 'Progress',
      type: 'Guest Post'
    }
  ];

  // Status badge style function
  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-green-600 text-white';
      case 'Submitted':
        return 'bg-yellow-500 text-white';
      case 'Progress':
        return 'bg-blue-600 text-white';
      case 'Revised':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <DashboardMainLayout>
      <DashboardHeader />
      
      <div className="mt-6">
        <h2 className="text-[24px] font-bold text-black mb-6">Link Progress</h2>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#E5E7EB] rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[24px] font-bold text-black block">{metrics.totalLinks.value}</span>
                <span className="text-[14px] text-[#6B7280]">Total Links</span>
              </div>
              <span className="text-[14px] text-green-600">{metrics.totalLinks.change}</span>
            </div>
          </div>
          
          <div className="bg-white border border-[#E5E7EB] rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[24px] font-bold text-black block">{metrics.liveLinks.value}</span>
                <span className="text-[14px] text-[#6B7280]">Live Links</span>
              </div>
              <span className="text-[14px] text-gray-600">{metrics.liveLinks.rate}</span>
            </div>
          </div>
          
          <div className="bg-white border border-[#E5E7EB] rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[24px] font-bold text-black block">{metrics.pendingLinks.value}</span>
                <span className="text-[14px] text-[#6B7280]">Pending Links</span>
              </div>
              <span className="text-[14px] text-gray-600">{metrics.pendingLinks.estimate}</span>
            </div>
          </div>
          
          <div className="bg-white border border-[#E5E7EB] rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[24px] font-bold text-black block">{metrics.avgDomainRating.value}</span>
                <span className="text-[14px] text-[#6B7280]">Avg Domain Rating</span>
              </div>
              <span className="text-[14px] text-green-600">{metrics.avgDomainRating.change}</span>
            </div>
          </div>
        </div>
        
        {/* Recent Links Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[18px] font-bold text-black">Recent Links</h3>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-md py-1 pl-3 pr-8 text-[14px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                >
                  <option>All Time</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <button className="px-3 py-1 text-[14px] bg-black text-white rounded-md">
                Build New Campaign
              </button>
              
              <button className="px-3 py-1 text-[14px] border border-[#E5E7EB] rounded-md">
                View All Links
              </button>
            </div>
          </div>
          
          {/* Links Table */}
          <div className="border border-[#E5E7EB] rounded-md overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">DATE</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">DOMAIN</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">DR</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">LINK FROM</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">LINK TO</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">ANCHOR TEXT</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">STATUS</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">TYPE</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id} className="border-b border-[#E5E7EB] hover:bg-gray-50">
                      <td className="px-4 py-3 text-[14px] text-gray-900">{link.date}</td>
                      <td className="px-4 py-3 text-[14px] text-gray-900">{link.domain}</td>
                      <td className="px-4 py-3 text-[14px] text-gray-900">{link.dr}</td>
                      <td className="px-4 py-3 text-[14px] text-gray-900">{link.linkFrom}</td>
                      <td className="px-4 py-3 text-[14px] text-gray-900">{link.linkTo}</td>
                      <td className="px-4 py-3 text-[14px] text-gray-900">{link.anchorText}</td>
                      <td className="px-4 py-3 text-[14px]">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeStyles(link.status)}`}>
                          {link.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[14px] text-gray-900">{link.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between">
            <button className="p-1 rounded-md text-[14px] text-gray-600 flex items-center">
              <ChevronLeftIcon className="h-4 w-4 mr-1" /> Previous
            </button>
            
            <div className="mx-4 bg-gray-200 rounded-full h-2 w-64">
              <div className="bg-gray-400 h-2 rounded-full w-1/3"></div>
            </div>
            
            <button className="p-1 rounded-md text-[14px] text-gray-600 flex items-center">
              Next <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </DashboardMainLayout>
  );
}