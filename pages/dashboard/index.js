import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardMainLayout from '../../components/dashboard/DashboardMainLayout';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import AddContentModal from '../../components/dashboard/AddContentModal';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, isTemporary, signOut } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Redirect to auth page if no user is logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [loading, user, router]);
  
  // Sample data for Priority Content - in real app this would come from Supabase
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

  const handleAddContent = () => {
    // In a real app, this would add the content to the database via Supabase
    console.log('Content added');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  return (
    <DashboardMainLayout>
      <DashboardHeader user={user} isTemporary={isTemporary} />
      
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] font-bold text-black">Priority Content</h2>
          <button 
            className="inline-flex items-center px-4 py-2 bg-black text-white text-[14px] font-medium rounded-md"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Content
          </button>
        </div>
        
        <div className="mt-4 bg-[#EFF6FF] border border-[#DBEAFE] rounded-md p-4 mb-4">
          <p className="text-[14px] text-[#1E40AF]">
            These are example content items. Add your first content to start tracking your own priority pages.
          </p>
        </div>
        
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-[14px] font-semibold text-black">URL</th>
                <th scope="col" className="px-4 py-3 text-left text-[14px] font-semibold text-black">Content Type</th>
                <th scope="col" className="px-4 py-3 text-left text-[14px] font-semibold text-black">Goal</th>
                <th scope="col" className="px-4 py-3 text-left text-[14px] font-semibold text-black">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-[14px] font-semibold text-black">Target Keyword</th>
                <th scope="col" className="px-4 py-3 text-left text-[14px] font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-[14px] text-gray-900">{item.url}</td>
                  <td className="px-4 py-3 text-[14px] text-gray-900">{item.contentType}</td>
                  <td className="px-4 py-3 text-[14px] text-gray-900">{item.goal}</td>
                  <td className="px-4 py-3 text-[14px]">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#DCFCE7] text-[#166534]">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[14px] text-gray-900">{item.targetKeyword}</td>
                  <td className="px-4 py-3 text-[14px] text-gray-600">
                    <div className="flex space-x-3">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Add Content Modal */}
        <AddContentModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddContent}
          user={user}
          isTemporary={isTemporary}
        />
      </div>
    </DashboardMainLayout>
  );
}