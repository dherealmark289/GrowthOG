import React, { useState } from 'react';
import ClientDashboardLayout from '../../components/dashboard/ClientDashboardLayout';
import PriorityContentTable from '../../components/dashboard/PriorityContentTable';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function PriorityContent() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Sample data
  const contentItems = [
    {
      id: 1,
      url: 'example.com/best-seo-strategy',
      contentType: 'Money Page',
      goal: 'SEO',
      status: 'Active',
      targetKeyword: 'best seo strategy'
    },
    {
      id: 2,
      url: 'example.com/seo-case-study',
      contentType: 'Case Study',
      goal: 'Both',
      status: 'Active',
      targetKeyword: 'seo case study results'
    }
  ];
  
  return (
    <ClientDashboardLayout title="Priority Content">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Priority Content</h2>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Content
        </button>
      </div>
      
      <PriorityContentTable items={contentItems} />
      
      {/* Add Content Modal (can be implemented later) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Priority Content</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                <input 
                  type="text" 
                  id="url" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="https://example.com/page"
                />
              </div>
              
              <div>
                <label htmlFor="content-type" className="block text-sm font-medium text-gray-700">Content Type</label>
                <select 
                  id="content-type" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Money Page">Money Page</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Blog Post">Blog Post</option>
                  <option value="Landing Page">Landing Page</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Goal</label>
                <select 
                  id="goal" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="SEO">SEO</option>
                  <option value="Conversions">Conversions</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="target-keyword" className="block text-sm font-medium text-gray-700">Target Keyword</label>
                <input 
                  type="text" 
                  id="target-keyword" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g. best SEO tools"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ClientDashboardLayout>
  );
}