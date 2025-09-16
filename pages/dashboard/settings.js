import React, { useState } from 'react';
import DashboardMainLayout from '../../components/dashboard/DashboardMainLayout';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [toggles, setToggles] = useState({
    marketing: true,
    social: false,
    updates: true
  });

  // This would come from your authentication context in a real app
  const user = {
    email: 'myron@example.com',
    name: 'myron'
  };

  const toggleNotification = (key) => {
    setToggles({
      ...toggles,
      [key]: !toggles[key]
    });
  };
  
  return (
    <DashboardMainLayout>
      <DashboardHeader />
      
      <div className="mt-6">
        <div className="mb-6">
          <h2 className="text-[24px] font-bold text-black">Settings</h2>
          <p className="text-[16px] text-[#6B7280]">Manage your account settings and preferences</p>
        </div>
        
        {/* Settings Tabs */}
        <div className="border-b border-[#E5E7EB] mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('account')}
              className={`py-2 px-2 text-[14px] border-b-2 ${
                activeTab === 'account' 
                  ? 'border-[#2563EB] text-[#2563EB] font-semibold'
                  : 'border-transparent text-[#6B7280]'
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab('brand')}
              className={`py-2 px-2 text-[14px] border-b-2 ${
                activeTab === 'brand' 
                  ? 'border-[#2563EB] text-[#2563EB] font-semibold'
                  : 'border-transparent text-[#6B7280]'
              }`}
            >
              Brand Settings
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-2 px-2 text-[14px] border-b-2 ${
                activeTab === 'notifications' 
                  ? 'border-[#2563EB] text-[#2563EB] font-semibold'
                  : 'border-transparent text-[#6B7280]'
              }`}
            >
              Notifications
            </button>
          </div>
        </div>
        
        {/* Account Settings Tab */}
        {activeTab === 'account' && (
          <div className="bg-white border border-[#E5E7EB] rounded-md p-6">
            <div className="mb-4">
              <h3 className="text-[18px] font-bold text-black mb-1">Account Settings</h3>
              <p className="text-[14px] text-[#6B7280]">Manage your account details and preferences</p>
            </div>
            
            <div className="mt-6">
              <div className="mb-4">
                <div className="text-[14px] font-semibold text-black mb-1">Email</div>
                <div className="text-[14px] text-[#6B7280]">{user.email}</div>
              </div>
              
              <div className="mb-4">
                <div className="text-[14px] font-semibold text-black mb-1">Name</div>
                <div className="text-[14px] text-[#6B7280]">{user.name}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Brand Settings Tab */}
        {activeTab === 'brand' && (
          <div className="bg-white border border-[#E5E7EB] rounded-md p-6">
            <div className="mb-4">
              <h3 className="text-[18px] font-bold text-black mb-1">Brand Settings</h3>
              <p className="text-[14px] text-[#6B7280]">Upload your brand logo and customize appearance</p>
            </div>
            
            <div className="mt-6">
              <div className="mb-4">
                <div className="text-[14px] font-semibold text-black mb-2">Brand Logo</div>
                <div className="flex items-center mt-2">
                  <label className="block">
                    <input type="file" className="sr-only" />
                    <span className="py-2 px-3 border border-[#E5E7EB] rounded-md text-[14px] cursor-pointer hover:bg-gray-50">
                      Choose file
                    </span>
                    <span className="ml-2 text-[14px] text-[#6B7280]">No file chosen.</span>
                  </label>
                </div>
                <p className="mt-1 text-[12px] text-[#6B7280]">
                  Use this URL in your Supabeans email templates to display your brand logo.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white border border-[#E5E7EB] rounded-md p-6">
            <div className="mb-4">
              <h3 className="text-[18px] font-bold text-black mb-1">Notification Preferences</h3>
              <p className="text-[14px] text-[#6B7280]">Manage your notification settings</p>
            </div>
            
            <div className="mt-6">
              <h4 className="text-[16px] font-semibold text-black mb-4">Email Notifications</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-[14px] font-medium text-black">Marketing emails</h5>
                    <p className="text-[14px] text-[#6B7280]">Receive emails about new products, features, and more.</p>
                  </div>
                  <button 
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${toggles.marketing ? 'bg-blue-600' : 'bg-gray-200'}`}
                    onClick={() => toggleNotification('marketing')}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${toggles.marketing ? 'translate-x-6' : 'translate-x-1'}`} 
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-[14px] font-medium text-black">Social emails</h5>
                    <p className="text-[14px] text-[#6B7280]">Receive emails for friend requests, follows, and more.</p>
                  </div>
                  <button 
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${toggles.social ? 'bg-blue-600' : 'bg-gray-200'}`}
                    onClick={() => toggleNotification('social')}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${toggles.social ? 'translate-x-6' : 'translate-x-1'}`} 
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-[14px] font-medium text-black">Update emails</h5>
                    <p className="text-[14px] text-[#6B7280]">Receive emails about your account activity and security.</p>
                  </div>
                  <button 
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${toggles.updates ? 'bg-blue-600' : 'bg-gray-200'}`}
                    onClick={() => toggleNotification('updates')}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${toggles.updates ? 'translate-x-6' : 'translate-x-1'}`} 
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end mt-8 gap-3">
                <button className="px-4 py-2 border border-[#E5E7EB] rounded-md text-[14px] text-[#374151]">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-md text-[14px]">
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardMainLayout>
  );
}