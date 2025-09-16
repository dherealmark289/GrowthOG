import React, { useState } from 'react';

export default function LinkDomainsTable({ domains = [], hasCampaign = false }) {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const toggleDomain = (domainId) => {
    if (selectedDomains.includes(domainId)) {
      setSelectedDomains(selectedDomains.filter(id => id !== domainId));
    } else {
      setSelectedDomains([...selectedDomains, domainId]);
    }
  };
  
  const toggleAll = () => {
    if (selectedDomains.length === domains.length) {
      setSelectedDomains([]);
    } else {
      setSelectedDomains(domains.map(domain => domain.id));
    }
  };
  
  return (
    <div>
      {!hasCampaign && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please create a campaign first in the Campaign Builder tab to add domains.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between mb-4">
        <div>
          <button 
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Domains
          </button>
        </div>
        <button
          disabled={selectedDomains.length === 0 || !hasCampaign}
          className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
            selectedDomains.length === 0 || !hasCampaign
              ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'border-transparent bg-black text-white hover:bg-gray-800'
          }`}
        >
          Add Selected to Campaign ({selectedDomains.length})
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={domains.length > 0 && selectedDomains.length === domains.length}
                  onChange={toggleAll}
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Domain
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DR Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Traffic
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(1)}
                  onChange={() => toggleDomain(1)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">techcrunch.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">94</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28.5M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$850</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Editorial</td>
            </tr>
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(2)}
                  onChange={() => toggleDomain(2)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">mashable.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">91</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19.2M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$950</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Editorial</td>
            </tr>
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(3)}
                  onChange={() => toggleDomain(3)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">cnet.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">91</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">49.2M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$950</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Editorial</td>
            </tr>
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(4)}
                  onChange={() => toggleDomain(4)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">inc.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">90</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22.1M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$900</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Guest Post</td>
            </tr>
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(5)}
                  onChange={() => toggleDomain(5)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">theverge.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">89</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25.5M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$850</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Guest Post</td>
            </tr>
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(6)}
                  onChange={() => toggleDomain(6)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">entrepreneur.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">89</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14.2M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$750</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Editorial</td>
            </tr>
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(7)}
                  onChange={() => toggleDomain(7)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">engadget.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">88</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.3M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$800</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Guest Post</td>
            </tr>
            <tr>
              <td className="pl-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedDomains.includes(8)}
                  onChange={() => toggleDomain(8)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">fastcompany.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">88</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.5M</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$800</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">Editorial</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Page <span className="font-medium">1</span> of <span className="font-medium">2</span>
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button 
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <span className="sr-only">Previous</span>
                Previous
              </button>
              <button
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span className="sr-only">Next</span>
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}