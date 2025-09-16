import React, { useState } from 'react';
import DashboardMainLayout from '../../components/dashboard/DashboardMainLayout';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function CampaignBuilderPage() {
  const [showDesigner, setShowDesigner] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [campaignOptions, setCampaignOptions] = useState({
    goal: '',
    budget: '',
    duration: '',
    velocity: '',
    articleType: ''
  });

  const handleSelectOption = (category, option) => {
    setCampaignOptions({
      ...campaignOptions,
      [category]: option
    });
  };

  const handleSaveCampaign = () => {
    setShowDesigner(false);
    setShowSuccess(true);
  };

  const handleStartDesign = () => {
    setShowDesigner(true);
  };

  return (
    <DashboardMainLayout>
      <DashboardHeader />
      
      <div className="mt-6">
        <div>
          <h2 className="text-[24px] font-bold text-black">Campaign Builder</h2>
          <p className="text-[16px] text-[#4B5563]">
            Build your custom link building campaign based on your goals and budget
          </p>
        </div>
        
        {/* Initial State */}
        {!showDesigner && !showSuccess && (
          <div className="mt-6">
            <button
              className="bg-black text-white font-semibold text-[14px] px-5 py-2.5 rounded-md"
              onClick={handleStartDesign}
            >
              Design Your Campaign
            </button>
          </div>
        )}
        
        {/* Campaign Designer */}
        {showDesigner && (
          <div className="mt-6 grid grid-cols-7 gap-6">
            {/* Left Column - Campaign Builder */}
            <div className="col-span-5">
              <div>
                <h3 className="text-[18px] font-bold text-black">Design your campaign</h3>
                <p className="text-[14px] text-[#6B7280]">Configure the key parameters for your link building campaign</p>
              </div>
              
              <div className="mt-6">
                <h4 className="text-[16px] font-bold text-black">Build Your Campaign</h4>
                <p className="text-[14px] text-[#6B7280]">Select parameters to create a custom link building strategy</p>
                
                {/* Goals Options */}
                <div className="mt-4">
                  <h5 className="text-[16px] font-semibold text-black mb-2">Goals</h5>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.goal === 'SEO' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('goal', 'SEO')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">SEO</h6>
                          <p className="text-[12px] text-[#6B7280]">Focus on rankings</p>
                        </div>
                        {campaignOptions.goal === 'SEO' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.goal === 'PR' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('goal', 'PR')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">PR</h6>
                          <p className="text-[12px] text-[#6B7280]">Brand visibility</p>
                        </div>
                        {campaignOptions.goal === 'PR' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.goal === 'Both' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('goal', 'Both')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">Both</h6>
                          <p className="text-[12px] text-[#6B7280]">Balanced approach</p>
                        </div>
                        {campaignOptions.goal === 'Both' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Monthly Budget Options */}
                <div className="mt-6">
                  <h5 className="text-[16px] font-semibold text-black mb-2">Monthly Budget</h5>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.budget === '$2,500' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('budget', '$2,500')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">$2,500</h6>
                          <p className="text-[12px] text-[#6B7280]">3-7 links</p>
                        </div>
                        {campaignOptions.budget === '$2,500' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.budget === '$5,000' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('budget', '$5,000')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">$5,000</h6>
                          <p className="text-[12px] text-[#6B7280]">8-12 links</p>
                        </div>
                        {campaignOptions.budget === '$5,000' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.budget === '$10,000+' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('budget', '$10,000+')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">$10,000+</h6>
                          <p className="text-[12px] text-[#6B7280]">12+ links</p>
                        </div>
                        {campaignOptions.budget === '$10,000+' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Campaign Duration Options */}
                <div className="mt-6">
                  <h5 className="text-[16px] font-semibold text-black mb-2">Campaign Duration</h5>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.duration === '3 months' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('duration', '3 months')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">3 months</h6>
                          <p className="text-[12px] text-[#6B7280]">Quick impact</p>
                        </div>
                        {campaignOptions.duration === '3 months' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.duration === '6 months' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('duration', '6 months')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">6 months</h6>
                          <p className="text-[12px] text-[#6B7280]">Balanced timeline</p>
                        </div>
                        {campaignOptions.duration === '6 months' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.duration === '12 months' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('duration', '12 months')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">12 months</h6>
                          <p className="text-[12px] text-[#6B7280]">Long-term growth</p>
                        </div>
                        {campaignOptions.duration === '12 months' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Link Velocity Options */}
                <div className="mt-6">
                  <h5 className="text-[16px] font-semibold text-black mb-2">Link Velocity</h5>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.velocity === 'Conservative' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('velocity', 'Conservative')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">Conservative</h6>
                          <p className="text-[12px] text-[#6B7280]">3-5 links/month</p>
                        </div>
                        {campaignOptions.velocity === 'Conservative' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.velocity === 'Balanced' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('velocity', 'Balanced')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">Balanced</h6>
                          <p className="text-[12px] text-[#6B7280]">5-10 links/month</p>
                        </div>
                        {campaignOptions.velocity === 'Balanced' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.velocity === 'Aggressive' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('velocity', 'Aggressive')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">Aggressive</h6>
                          <p className="text-[12px] text-[#6B7280]">10+ links/month</p>
                        </div>
                        {campaignOptions.velocity === 'Aggressive' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Type of Articles Options */}
                <div className="mt-6">
                  <h5 className="text-[16px] font-semibold text-black mb-2">Type of Articles</h5>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.articleType === 'Money Pages' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('articleType', 'Money Pages')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">Money Pages</h6>
                          <p className="text-[12px] text-[#6B7280]">Commercial intent</p>
                        </div>
                        {campaignOptions.articleType === 'Money Pages' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.articleType === 'Resources' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('articleType', 'Resources')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">Resources</h6>
                          <p className="text-[12px] text-[#6B7280]">Educational content</p>
                        </div>
                        {campaignOptions.articleType === 'Resources' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-3 cursor-pointer ${
                        campaignOptions.articleType === 'Primary Research' ? 'border-2 border-black' : 'border-[#E5E7EB]'
                      }`}
                      onClick={() => handleSelectOption('articleType', 'Primary Research')}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h6 className="text-[14px] font-semibold text-black">Primary Research</h6>
                          <p className="text-[12px] text-[#6B7280]">Original insights</p>
                        </div>
                        {campaignOptions.articleType === 'Primary Research' && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="mt-8 flex justify-end">
                  <button
                    className="px-4 py-2 mr-3 border border-[#E5E7EB] rounded-md text-[14px]"
                    onClick={() => setShowDesigner(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-black text-white rounded-md text-[14px]"
                    onClick={handleSaveCampaign}
                    disabled={!campaignOptions.goal || !campaignOptions.budget || !campaignOptions.duration || !campaignOptions.velocity || !campaignOptions.articleType}
                  >
                    Save Campaign
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Campaign Strategy */}
            <div className="col-span-2">
              <div>
                <h3 className="text-[18px] font-bold text-black">Campaign Strategy</h3>
                <p className="text-[14px] text-[#6B7280]">Estimated results based on your selections</p>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="text-[16px] font-bold text-black">5-10 links per month</div>
                  <div className="text-[14px] text-[#6B7280]">Approximately</div>
                </div>
                
                <div>
                  <div className="text-[16px] font-bold text-black">55-65</div>
                  <div className="text-[14px] text-[#6B7280]">DR range</div>
                </div>
                
                <div>
                  <div className="text-[16px] font-bold text-black">45-60 days</div>
                  <div className="text-[14px] text-[#6B7280]">Expected timeline for SEP impact</div>
                </div>
                
                <div>
                  <div className="text-[16px] font-bold text-black">70% SEO, 30% brand authority</div>
                  <div className="text-[14px] text-[#6B7280]">Recommended ratio</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-[16px] font-bold text-black mb-3">Projected Outcomes</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-2 w-2 bg-black rounded-full mt-1.5 mr-2"></span>
                    <span className="text-[14px] text-[#4B5563]">Improved rankings for target keywords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-2 w-2 bg-black rounded-full mt-1.5 mr-2"></span>
                    <span className="text-[14px] text-[#4B5563]">Domain authority growth within 6 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-2 w-2 bg-black rounded-full mt-1.5 mr-2"></span>
                    <span className="text-[14px] text-[#4B5563]">Monthly referral traffic increase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-2 w-2 bg-black rounded-full mt-1.5 mr-2"></span>
                    <span className="text-[14px] text-[#4B5563]">Educational content that builds topical authority</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Success View */}
        {showSuccess && (
          <div className="mt-6">
            <div className="bg-[#DCFCE7] border border-[#86EFAC] rounded-md p-4 mb-6">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full p-1 mr-2">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-green-800">Campaign Created Successfully</p>
                  <p className="text-[14px] text-green-700">Your campaign has been created and will be reviewed by our team.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-[#E5E7EB] rounded-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-bold text-black">Campaign Summary</h3>
                <button 
                  className="text-[14px] text-blue-600 hover:text-blue-700"
                  onClick={() => {
                    setShowSuccess(false);
                    setShowDesigner(true);
                  }}
                >
                  Edit Campaign
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[14px] text-[#6B7280]">Goal</p>
                  <p className="text-[14px] font-medium text-black">Both (Balanced)</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">Expected Links Per Month</p>
                  <p className="text-[14px] font-medium text-black">5-10</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">Monthly Budget</p>
                  <p className="text-[14px] font-medium text-black">$5000</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">Average DR Range</p>
                  <p className="text-[14px] font-medium text-black">55-65</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">Campaign Duration</p>
                  <p className="text-[14px] font-medium text-black">6 months</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">Timeline for SEP Impact</p>
                  <p className="text-[14px] font-medium text-black">45-60 days</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">Link Velocity</p>
                  <p className="text-[14px] font-medium text-black">Balanced (5-10 links/month)</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">SEO vs Brand Authority Ratio</p>
                  <p className="text-[14px] font-medium text-black">70% SEO, 30% brand authority</p>
                </div>
                
                <div>
                  <p className="text-[14px] text-[#6B7280]">Type of Articles</p>
                  <p className="text-[14px] font-medium text-black">Resources</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button className="flex items-center px-4 py-2 bg-black text-white rounded-md text-[14px]">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download Summary
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardMainLayout>
  );
}