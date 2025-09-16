import { useState, useEffect } from 'react';

export default function BookStrategyCallModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyStage: '',
    niche: '',
    challenges: [],
    budget: '',
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  // Reset the form when opened/closed
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        companyStage: '',
        niche: '',
        challenges: [],
        budget: '',
        name: '',
        email: '',
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleNextStep = () => {
    if (currentStep === 5) {
      // Form validation for step 5 (contact information)
      const newErrors = {};
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear errors for the field being changed
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const handleCheckboxChange = (value) => {
    const updatedChallenges = [...formData.challenges];
    const index = updatedChallenges.indexOf(value);
    
    if (index === -1) {
      updatedChallenges.push(value);
    } else {
      updatedChallenges.splice(index, 1);
    }
    
    setFormData({
      ...formData,
      challenges: updatedChallenges,
    });
  };

  const handleBookCall = () => {
    // In a real implementation, this would send data to a backend or analytics
    console.log('Booking strategy call with data:', formData);
    window.open('https://calendly.com/russell-jba/30min', '_blank');
  };

  const handleBuildStrategy = () => {
    // In a real implementation, this would send data to a backend or analytics
    console.log('Building strategy with data:', formData);
    // Implement the strategy builder functionality
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-xl max-w-[550px] w-full mx-auto p-8 shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#6B7280] hover:text-black"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Header */}
          <h2 className="text-[28px] font-extrabold text-black mb-6">Schedule a Strategy Call</h2>
          
          {/* Step content */}
          <div className="mb-8">
            {/* Step 1: Company Stage */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-[22px] font-bold text-black mb-4">What stage is your company at?</h3>
                <div className="space-y-4">
                  <button
                    className={`w-full text-left border ${
                      formData.companyStage === 'early-stage' 
                        ? 'border-2 border-black' 
                        : 'border-[#E5E7EB]'
                    } rounded-lg p-5`}
                    onClick={() => handleChange('companyStage', 'early-stage')}
                  >
                    <div className="font-bold text-[16px]">EARLY-STAGE</div>
                    <div className="text-[14px] text-[#6B7280]">Pre-Seed to Series A</div>
                  </button>
                  
                  <button
                    className={`w-full text-left border ${
                      formData.companyStage === 'high-growth' 
                        ? 'border-2 border-black' 
                        : 'border-[#E5E7EB]'
                    } rounded-lg p-5`}
                    onClick={() => handleChange('companyStage', 'high-growth')}
                  >
                    <div className="font-bold text-[16px]">HIGH-GROWTH</div>
                    <div className="text-[14px] text-[#6B7280]">Series A to Series C</div>
                  </button>
                  
                  <button
                    className={`w-full text-left border ${
                      formData.companyStage === 'established' 
                        ? 'border-2 border-black' 
                        : 'border-[#E5E7EB]'
                    } rounded-lg p-5`}
                    onClick={() => handleChange('companyStage', 'established')}
                  >
                    <div className="font-bold text-[16px]">ESTABLISHED</div>
                    <div className="text-[14px] text-[#6B7280]">Series D+</div>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Company Niche */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-[22px] font-bold text-black mb-4">What niche are you in?</h3>
                <div className="space-y-4">
                  <button
                    className={`w-full text-left border ${
                      formData.niche === 'saas' 
                        ? 'border-2 border-black' 
                        : 'border-[#E5E7EB]'
                    } rounded-lg p-5`}
                    onClick={() => handleChange('niche', 'saas')}
                  >
                    <div className="font-bold text-[16px]">SaaS</div>
                  </button>
                  
                  <button
                    className={`w-full text-left border ${
                      formData.niche === 'ecommerce' 
                        ? 'border-2 border-black' 
                        : 'border-[#E5E7EB]'
                    } rounded-lg p-5`}
                    onClick={() => handleChange('niche', 'ecommerce')}
                  >
                    <div className="font-bold text-[16px]">E-Commerce</div>
                  </button>
                  
                  <button
                    className={`w-full text-left border ${
                      formData.niche === 'other' 
                        ? 'border-2 border-black' 
                        : 'border-[#E5E7EB]'
                    } rounded-lg p-5`}
                    onClick={() => handleChange('niche', 'other')}
                  >
                    <div className="font-bold text-[16px]">Other</div>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Primary Challenges */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-[22px] font-bold text-black mb-2">What are your primary challenges right now?</h3>
                <p className="text-[16px] text-[#6B7280] mb-4">Select all that apply</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'limited-resources',
                      label: 'Limited resources for outreach, content creation, and quality control'
                    },
                    {
                      id: 'specialized-knowledge',
                      label: 'Need for specialized knowledge and relationships not present in-house'
                    },
                    {
                      id: 'high-costs',
                      label: 'High costs and resource demands for setting up effective link-building'
                    },
                    {
                      id: 'quality-maintenance',
                      label: 'Difficulty maintaining quality while expanding link-building efforts'
                    },
                    {
                      id: 'high-quality-links',
                      label: 'Struggling to obtain high-quality, authoritative links'
                    },
                    {
                      id: 'relevant-backlinks',
                      label: 'Ensuring backlinks from contextually relevant content for maximum SEO benefit'
                    }
                  ].map((challenge) => (
                    <div 
                      key={challenge.id}
                      className="border border-[#E5E7EB] rounded-lg p-4 flex items-start"
                    >
                      <div className="flex items-center h-5 mr-3 mt-0.5">
                        <input
                          id={challenge.id}
                          type="checkbox"
                          className="h-5 w-5 border-[#E5E7EB] rounded"
                          checked={formData.challenges.includes(challenge.id)}
                          onChange={() => handleCheckboxChange(challenge.id)}
                        />
                      </div>
                      <label htmlFor={challenge.id} className="text-[14px]">
                        {challenge.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 4: Monthly Budget */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-[22px] font-bold text-black mb-4">What's your monthly budget for link building?</h3>
                <div className="space-y-4">
                  {[
                    { id: 'under-2000', label: 'Under $2,000 / month' },
                    { id: '2000-5000', label: '$2,000 - $5,000 / month' },
                    { id: '5000-10000', label: '$5,000 - $10,000 / month' },
                    { id: 'over-10000', label: 'Over $10,000 / month' }
                  ].map((option) => (
                    <div 
                      key={option.id}
                      className={`w-full border ${
                        formData.budget === option.id 
                          ? 'border-2 border-black' 
                          : 'border-[#E5E7EB]'
                      } rounded-lg p-4 flex items-center`}
                      onClick={() => handleChange('budget', option.id)}
                    >
                      <div className="mr-3">
                        <div className="w-5 h-5 rounded-full border border-[#E5E7EB] flex items-center justify-center">
                          {formData.budget === option.id && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                      <span className="font-medium text-[16px]">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 5: Contact Information */}
            {currentStep === 5 && (
              <div>
                <h3 className="text-[22px] font-bold text-black mb-2">Your contact information</h3>
                <p className="text-[16px] text-[#6B7280] mb-4">Please provide your contact details so we can prepare for our call.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[16px] font-medium text-black mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className={`w-full h-12 px-4 py-3 border ${
                          errors.name ? 'border-red-500' : 'border-[#E5E7EB]'
                        } rounded-lg focus:ring-black focus:border-black`}
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                      {errors.name && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[16px] font-medium text-black mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        className={`w-full h-12 px-4 py-3 border ${
                          errors.email ? 'border-red-500' : 'border-[#E5E7EB]'
                        } rounded-lg focus:ring-black focus:border-black`}
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 6: Final Options */}
            {currentStep === 6 && (
              <div>
                <h3 className="text-[22px] font-bold text-black mb-2">Great! Let's take the next step</h3>
                <p className="text-[16px] text-[#6B7280] mb-4">
                  Based on your responses, we can either schedule a strategy call with our team or build a custom link-building strategy for your company.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 border border-[#E5E7EB] rounded-lg p-5">
                    <h4 className="font-bold text-[18px] mb-2">Book a Strategy Call</h4>
                    <p className="text-[14px] text-[#6B7280] mb-4">
                      Talk with our experts to discuss your specific needs and how we can help.
                    </p>
                    <button
                      onClick={handleBookCall}
                      className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800"
                    >
                      Book a Call
                    </button>
                  </div>
                  
                  <div className="flex-1 border border-[#E5E7EB] rounded-lg p-5">
                    <h4 className="font-bold text-[18px] mb-2">Build My Strategy</h4>
                    <p className="text-[14px] text-[#6B7280] mb-4">
                      Get a customized link building strategy based on your company profile.
                    </p>
                    <button
                      onClick={handleBuildStrategy}
                      className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800"
                    >
                      Build Strategy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation buttons */}
          {currentStep < 6 && (
            <div className="flex justify-end space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 border border-[#E5E7EB] rounded-md text-[14px] font-semibold"
                >
                  Back
                </button>
              )}
              
              <button
                onClick={handleNextStep}
                className={`px-5 py-2.5 rounded-md text-[14px] font-semibold text-white ${
                  currentStep >= 4 ? 'bg-black' : 'bg-[#6B7280]'
                }`}
              >
                Next
              </button>
            </div>
          )}
          
          {currentStep === 6 && (
            <div className="flex justify-start mt-4">
              <button
                onClick={handlePrevStep}
                className="px-5 py-2.5 border border-[#E5E7EB] rounded-md text-[14px] font-semibold"
              >
                Back
              </button>
            </div>
          )}
          
          {/* Step indicator dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  currentStep === step ? 'bg-black' : 'bg-[#E5E7EB]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}