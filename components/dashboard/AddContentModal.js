import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';

export default function AddContentModal({ isOpen, onClose, onAdd, user, isTemporary }) {
  const [formData, setFormData] = useState({
    url: '',
    contentType: 'Money Page (Product/Service page)',
    goal: 'SEO (Rankings focused)',
    status: 'Active',
    targetKeyword: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  if (!isOpen) return null;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.url.trim()) {
      errors.url = 'URL is required';
    } else if (!formData.url.includes('.')) {
      errors.url = 'Please enter a valid URL';
    }
    
    if (!formData.targetKeyword.trim()) {
      errors.targetKeyword = 'Target keyword is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Store in Supabase if using permanent account
      if (!isTemporary && user) {
        // In a real implementation, you would insert to Supabase here
        await supabase.from('priority_content').insert({
          url: formData.url,
          content_type: formData.contentType,
          goal: formData.goal,
          status: formData.status,
          target_keyword: formData.targetKeyword,
          notes: formData.notes,
          user_id: user.id,
          is_temporary: false
        });
      } 
      // For temporary session
      else if (user && user.email) {
        // Store to temporary user table
        await supabase.from('priority_content').insert({
          url: formData.url,
          content_type: formData.contentType,
          goal: formData.goal,
          status: formData.status,
          target_keyword: formData.targetKeyword,
          notes: formData.notes,
          email: user.email,
          is_temporary: true
        });
      }
      
      onAdd();
      onClose();
    } catch (error) {
      console.error('Error adding content:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
          aria-hidden="true"
        ></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-[18px] font-bold text-black">Add Priority Content</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="px-6 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="url" className="block mb-1 text-[14px] font-semibold text-black">URL</label>
                <input 
                  id="url"
                  name="url"
                  type="text" 
                  placeholder="example.com/page" 
                  value={formData.url}
                  onChange={handleInputChange}
                  className={`w-full h-10 px-3 border ${formErrors.url ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                />
                {formErrors.url && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.url}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="contentType" className="block mb-1 text-[14px] font-semibold text-black">Content Type</label>
                <select 
                  id="contentType"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-[#D1D5DB] rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                >
                  <option value="Money Page (Product/Service page)">Money Page (Product/Service page)</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Blog Post">Blog Post</option>
                  <option value="Landing Page">Landing Page</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="goal" className="block mb-1 text-[14px] font-semibold text-black">Goal</label>
                <select 
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-[#D1D5DB] rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                >
                  <option value="SEO (Rankings focused)">SEO (Rankings focused)</option>
                  <option value="PR (Brand focused)">PR (Brand focused)</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="status" className="block mb-1 text-[14px] font-semibold text-black">Status</label>
                <select 
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-[#D1D5DB] rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="targetKeyword" className="block mb-1 text-[14px] font-semibold text-black">Target Keyword</label>
                <input 
                  id="targetKeyword"
                  name="targetKeyword"
                  type="text" 
                  placeholder="Your primary keyword" 
                  value={formData.targetKeyword}
                  onChange={handleInputChange}
                  className={`w-full h-10 px-3 border ${formErrors.targetKeyword ? 'border-red-500' : 'border-[#D1D5DB]'} rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                />
                {formErrors.targetKeyword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.targetKeyword}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="notes" className="block mb-1 text-[14px] font-semibold text-black">Notes</label>
                <textarea 
                  id="notes"
                  name="notes"
                  placeholder="Special instructions or focus areas" 
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full h-20 px-3 py-2 border border-[#D1D5DB] rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                ></textarea>
              </div>
            
              {isTemporary && (
                <div className="p-3 mb-4 text-sm text-[#92400E] bg-[#FFFBEB] border border-[#FEF3C7] rounded">
                  <p>
                    You're using a temporary session. Your content will be saved but to ensure long-term access, consider upgrading to a permanent account via the magic link option.
                  </p>
                </div>
              )}
            </form>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button 
              onClick={onClose}
              className="px-4 py-2 mr-2 text-[14px] text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 text-[14px] text-white bg-black rounded-md hover:bg-gray-800 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Adding...' : 'Add Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}