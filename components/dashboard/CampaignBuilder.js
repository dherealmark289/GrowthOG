import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function CampaignBuilder() {
  const [expandedView, setExpandedView] = useState(false);
  const [campaignCreated, setCampaignCreated] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    goal: 'Both',
    budget: '$5,000',
    duration: '6 months',
    velocity: 'Balanced',
    articleType: 'Resources'
  });

  const handleOptionSelect = (category, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [category]: option
    });
  };

  const handleDesignClick = () => {
    setExpandedView(true);
  };

  const handleSaveClick = () => {
    setCampaignCreated(true);
  };

  const handleCancelClick = () => {
    setExpandedView(false);
    setCampaignCreated(false);
  };

  const isOptionSelected = (category, option) => {
    return selectedOptions[category] === option;
  };

  if (!expandedView && !campaignCreated) {
    return (
      <div>
        <p className="text-[#6B7280] mb-8">
          Build your custom link building campaign based on your goals and budget
        </p>
        
        <button
          onClick={handleDesignClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Design Your Campaign
        </button>
      </div>
    );
  }

  if (campaignCreated) {
    return (
      <div>
        {/* Success Message */}
        <div className="mb-6 p-4 bg-[#DCFCE7] border border-[#86EFAC] rounded-md">
          <div className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
            <div>
              <h3 className="text-sm font-bold text-green-800">Campaign Created Successfully</h3>
              <p className="text-sm text-green-700">Your campaign has been created and will be reviewed by our team.</p>
            </div>
          </div>
        </div>

        {/* Campaign Summary */}
        <div className="border border-[#E5E7EB] rounded-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] font-bold text-black">Campaign Summary</h3>
            <button className="text-[14px] text-[#2563EB] hover:underline">Edit Campaign</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Goal</p>
                <p className="text-[16px] font-medium text-black">{selectedOptions.goal} (Balanced)</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Monthly Budget</p>
                <p className="text-[16px] font-medium text-black">{selectedOptions.budget}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Campaign Duration</p>
                <p className="text-[16px] font-medium text-black">{selectedOptions.duration}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Link Velocity</p>
                <p className="text-[16px] font-medium text-black">{selectedOptions.velocity} (5-10 links/month)</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Type of Articles</p>
                <p className="text-[16px] font-medium text-black">{selectedOptions.articleType}</p>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Expected Links Per Month</p>
                <p className="text-[16px] font-medium text-black">5-10</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Average DR Range</p>
                <p className="text-[16px] font-medium text-black">55-65</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">Timeline for SERP Impact</p>
                <p className="text-[16px] font-medium text-black">45-60 days</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[14px] text-[#6B7280] mb-1">SEO vs Brand Authority Ratio</p>
                <p className="text-[16px] font-medium text-black">70% SEO, 30% brand authority</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="inline-flex items-center px-4 py-2 bg-black text-white text-[14px] font-medium rounded-md hover:bg-gray-800">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Download Summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Campaign Configuration */}
        <div className="border border-[#E5E7EB] rounded-md p-6">
          <h3 className="text-[18px] font-bold text-black">Design your campaign</h3>
          <p className="text-[14px] text-[#6B7280] mb-6">Configure the key parameters for your link building campaign.</p>

          <div className="mb-6">
            <h4 className="text-[16px] font-bold text-black mb-1">Build Your Campaign</h4>
            <p className="text-[14px] text-[#6B7280] mb-4">Select parameters to create a custom link building strategy</p>
          </div>

          {/* Goals */}
          <div className="mb-6">
            <h4 className="text-[16px] font-semibold text-black mb-3">Goals</h4>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => handleOptionSelect('goal', 'SEO')}
                className={`cursor-pointer border ${isOptionSelected('goal', 'SEO') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">SEO</h5>
                <p className="text-[12px] text-[#6B7280]">Focus on rankings</p>
                {isOptionSelected('goal', 'SEO') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('goal', 'PR')}
                className={`cursor-pointer border ${isOptionSelected('goal', 'PR') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">PR</h5>
                <p className="text-[12px] text-[#6B7280]">Brand authority</p>
                {isOptionSelected('goal', 'PR') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('goal', 'Both')}
                className={`cursor-pointer border ${isOptionSelected('goal', 'Both') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">Both</h5>
                <p className="text-[12px] text-[#6B7280]">Balanced</p>
                {isOptionSelected('goal', 'Both') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* Monthly Budget */}
          <div className="mb-6">
            <h4 className="text-[16px] font-semibold text-black mb-3">Monthly Budget</h4>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => handleOptionSelect('budget', '$2,500')}
                className={`cursor-pointer border ${isOptionSelected('budget', '$2,500') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">$2,500</h5>
                <p className="text-[12px] text-[#6B7280]">3-7 links</p>
                {isOptionSelected('budget', '$2,500') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('budget', '$5,000')}
                className={`cursor-pointer border ${isOptionSelected('budget', '$5,000') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">$5,000</h5>
                <p className="text-[12px] text-[#6B7280]">8-13 links</p>
                {isOptionSelected('budget', '$5,000') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('budget', '$10,000+')}
                className={`cursor-pointer border ${isOptionSelected('budget', '$10,000+') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">$10,000+</h5>
                <p className="text-[12px] text-[#6B7280]">20+ links</p>
                {isOptionSelected('budget', '$10,000+') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* Campaign Duration */}
          <div className="mb-6">
            <h4 className="text-[16px] font-semibold text-black mb-3">Campaign Duration</h4>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => handleOptionSelect('duration', '3 months')}
                className={`cursor-pointer border ${isOptionSelected('duration', '3 months') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold">3 months</h5>
                {isOptionSelected('duration', '3 months') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('duration', '6 months')}
                className={`cursor-pointer border ${isOptionSelected('duration', '6 months') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold">6 months</h5>
                {isOptionSelected('duration', '6 months') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('duration', '12 months')}
                className={`cursor-pointer border ${isOptionSelected('duration', '12 months') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold">12 months</h5>
                {isOptionSelected('duration', '12 months') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* Link Velocity */}
          <div className="mb-6">
            <h4 className="text-[16px] font-semibold text-black mb-3">Link Velocity</h4>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => handleOptionSelect('velocity', 'Conservative')}
                className={`cursor-pointer border ${isOptionSelected('velocity', 'Conservative') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">Conservative</h5>
                <p className="text-[12px] text-[#6B7280]">3-5 links/month</p>
                {isOptionSelected('velocity', 'Conservative') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('velocity', 'Balanced')}
                className={`cursor-pointer border ${isOptionSelected('velocity', 'Balanced') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">Balanced</h5>
                <p className="text-[12px] text-[#6B7280]">6-10 links/month</p>
                {isOptionSelected('velocity', 'Balanced') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('velocity', 'Aggressive')}
                className={`cursor-pointer border ${isOptionSelected('velocity', 'Aggressive') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">Aggressive</h5>
                <p className="text-[12px] text-[#6B7280]">12-15 links/month</p>
                {isOptionSelected('velocity', 'Aggressive') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* Type of Articles */}
          <div className="mb-6">
            <h4 className="text-[16px] font-semibold text-black mb-3">Type of Articles</h4>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => handleOptionSelect('articleType', 'Money Pages')}
                className={`cursor-pointer border ${isOptionSelected('articleType', 'Money Pages') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">Money Pages</h5>
                <p className="text-[12px] text-[#6B7280]">Commercial intent</p>
                {isOptionSelected('articleType', 'Money Pages') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('articleType', 'Resources')}
                className={`cursor-pointer border ${isOptionSelected('articleType', 'Resources') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">Resources</h5>
                <p className="text-[12px] text-[#6B7280]">Information content</p>
                {isOptionSelected('articleType', 'Resources') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <div 
                onClick={() => handleOptionSelect('articleType', 'Primary Research')}
                className={`cursor-pointer border ${isOptionSelected('articleType', 'Primary Research') ? 'border-2 border-black' : 'border-[#E5E7EB]'} rounded-md p-3 relative`}
              >
                <h5 className="text-[14px] font-semibold mb-1">Primary Research</h5>
                <p className="text-[12px] text-[#6B7280]">Original findings</p>
                {isOptionSelected('articleType', 'Primary Research') && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handleCancelClick}
              className="px-4 py-2 text-[14px] bg-white border border-[#E5E7EB] text-[#374151] rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveClick}
              className="px-4 py-2 text-[14px] bg-[#0F172A] text-white rounded-md hover:bg-gray-800"
            >
              Save Campaign
            </button>
          </div>
        </div>

        {/* Right Column - Campaign Strategy */}
        <div className="border border-[#E5E7EB] rounded-md p-6">
          <h3 className="text-[18px] font-bold text-black">Campaign Strategy</h3>
          <p className="text-[14px] text-[#6B7280] mb-6">Estimated results based on your selections</p>

          {/* Expected Metrics */}
          <div className="mb-8">
            <div className="mb-3">
              <span className="text-[14px]">
                <strong>Expected links per month:</strong> 5-10 links per month
              </span>
            </div>
            <div className="mb-3">
              <span className="text-[14px]">
                <strong>Projected DR average:</strong> 55-65
              </span>
            </div>
            <div className="mb-3">
              <span className="text-[14px]">
                <strong>Expected timeline for SERP impact:</strong> 45-60 days
              </span>
            </div>
            <div className="mb-3">
              <span className="text-[14px]">
                <strong>Recommended ratio:</strong> 70% SEO, 30% brand authority
              </span>
            </div>
          </div>

          {/* Projected Outcomes */}
          <div>
            <h4 className="text-[16px] font-semibold text-black mb-3">Projected Outcomes</h4>
            <ul className="text-[14px] space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-black rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Improved rankings for target keywords</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-black rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Domain authority growth within 6 months</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-black rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Steady referral traffic increase</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-black rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Educational content that builds topical authority</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}