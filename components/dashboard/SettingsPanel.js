import React, { useState } from 'react';

export default function SettingsPanel({ user }) {
  const [activeTab, setActiveTab] = useState('account');
  
  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      {/* Settings Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Settings Tabs">
          <button
            onClick={() => setActiveTab('account')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'account'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'brand'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Brand Settings
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'notifications'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Notifications
          </button>
        </nav>
      </div>
      
      {/* Account Settings */}
      {activeTab === 'account' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
            <p className="text-sm text-gray-500">Manage your account details and preferences</p>
          </div>
          
          <div className="mt-6">
            <dl className="space-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email || 'myron@bell697@gmail.com'}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.name || 'myron'}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      
      {/* Brand Settings */}
      {activeTab === 'brand' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-900">Brand Settings</h3>
            <p className="text-sm text-gray-500">Customize your brand settings and preferences</p>
          </div>
          
          <div className="mt-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="brand-name" className="block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brand-name"
                  defaultValue="My Brand"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  defaultValue="https://example.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  id="industry"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>SaaS</option>
                  <option>E-commerce</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
            <p className="text-sm text-gray-500">Manage how and when you receive notifications</p>
          </div>
          
          <div className="mt-6">
            <fieldset>
              <legend className="text-sm font-medium text-gray-900">Email Notifications</legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="new-link"
                      name="new-link"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="new-link" className="font-medium text-gray-700">New Link Notifications</label>
                    <p className="text-gray-500">Receive an email when a new backlink is created for your website.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="campaign-updates"
                      name="campaign-updates"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="campaign-updates" className="font-medium text-gray-700">Campaign Updates</label>
                    <p className="text-gray-500">Receive campaign progress reports and updates.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing"
                      name="marketing"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing" className="font-medium text-gray-700">Marketing</label>
                    <p className="text-gray-500">Receive tips, resources, and special offers.</p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      )}
    </div>
  );
}