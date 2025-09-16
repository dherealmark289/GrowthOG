import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DashboardMainLayout from '../../components/dashboard/DashboardMainLayout';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

export default function LinkDomains() {
  const [selectedDomains, setSelectedDomains] = useState([]);
  
  // Sample domain data
  const domains = [
    {
      id: 1,
      name: 'techcrunch.com',
      drScore: 94,
      traffic: '28.5M',
      price: '$850',
      linkType: 'Editorial'
    },
    {
      id: 2,
      name: 'mashable.com',
      drScore: 91,
      traffic: '19.3M',
      price: '$950',
      linkType: 'Editorial'
    },
    {
      id: 3,
      name: 'cnet.com',
      drScore: 91,
      traffic: '48.2M',
      price: '$900',
      linkType: 'Editorial'
    },
    {
      id: 4,
      name: 'inc.com',
      drScore: 90,
      traffic: '22.1M',
      price: '$900',
      linkType: 'Guest Post'
    },
    {
      id: 5,
      name: 'theverge.com',
      drScore: 89,
      traffic: '25.6M',
      price: '$850',
      linkType: 'Guest Post'
    },
    {
      id: 6,
      name: 'entrepreneur.com',
      drScore: 89,
      traffic: '14.2M',
      price: '$750',
      linkType: 'Editorial'
    },
    {
      id: 7,
      name: 'engadget.com',
      drScore: 88,
      traffic: '18.3M',
      price: '$800',
      linkType: 'Guest Post'
    },
    {
      id: 8,
      name: 'fastcompany.com',
      drScore: 88,
      traffic: '16.5M',
      price: '$800',
      linkType: 'Editorial'
    }
  ];
  
  const toggleDomainSelection = (domainId) => {
    if (selectedDomains.includes(domainId)) {
      setSelectedDomains(selectedDomains.filter(id => id !== domainId));
    } else {
      setSelectedDomains([...selectedDomains, domainId]);
    }
  };
  
  const getLinkTypeBadgeStyle = (linkType) => {
    if (linkType === 'Editorial') {
      return 'text-red-600';
    } else {
      return 'text-gray-700';
    }
  };
  
  return (
    <DashboardMainLayout>
      <DashboardHeader />
      
      <div className="mt-6">
        <h2 className="text-[24px] font-bold text-black mb-6">Link Domains</h2>
        
        {/* Header with Actions */}
        <div className="flex justify-end items-center mb-6">
          <div className="flex space-x-3">
            <button className="px-3 py-1 text-[14px] border border-[#E5E7EB] rounded-md flex items-center">
              Filter Domains
            </button>
            <button 
              className={`px-3 py-1 text-[14px] ${selectedDomains.length > 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'} rounded-md`}
              disabled={selectedDomains.length === 0}
            >
              Add Selected to Campaign ({selectedDomains.length})
            </button>
          </div>
        </div>
        
        {/* Domains Table */}
        <div className="border border-[#E5E7EB] rounded-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#F9FAFB]">
                  <th className="px-4 py-3 text-left w-10">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDomains(domains.map(d => d.id));
                          } else {
                            setSelectedDomains([]);
                          }
                        }}
                        checked={selectedDomains.length === domains.length && domains.length > 0}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">DOMAIN</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">DR SCORE</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">MONTHLY TRAFFIC</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">PRICE</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-black border-b border-[#E5E7EB]">LINK TYPE</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain) => (
                  <tr key={domain.id} className="border-b border-[#E5E7EB] hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        checked={selectedDomains.includes(domain.id)}
                        onChange={() => toggleDomainSelection(domain.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-900 font-medium">{domain.name}</td>
                    <td className="px-4 py-3 text-[14px] text-gray-900">{domain.drScore}</td>
                    <td className="px-4 py-3 text-[14px] text-gray-900">{domain.traffic}</td>
                    <td className="px-4 py-3 text-[14px] text-gray-900">{domain.price}</td>
                    <td className="px-4 py-3 text-[14px]">
                      <span className={`text-xs font-medium ${getLinkTypeBadgeStyle(domain.linkType)}`}>
                        {domain.linkType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center">
          <button className="p-1 rounded-md text-[14px] text-gray-600 flex items-center">
            <ChevronLeftIcon className="h-4 w-4 mr-1" /> Previous
          </button>
          <span className="text-[14px] text-gray-600">Page 1 of 2</span>
          <button className="p-1 rounded-md text-[14px] text-gray-600 flex items-center">
            Next <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </DashboardMainLayout>
  );
}