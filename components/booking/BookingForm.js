import { useState } from 'react';

const BookingForm = ({ onSubmitSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    monthlyTraffic: '',
    currentLinks: '',
    goals: '',
    date: '',
    time: '',
    timezone: 'EST'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    console.log('Form submitted:', formData);
    onSubmitSuccess();
  };
  
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM'
  ];

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1); // Start from tomorrow
    return date.toISOString().split('T')[0];
  });

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-xl font-semibold text-secondary-900 mb-6">
        Book Your Strategy Call
      </h3>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  currentStep === step
                    ? 'bg-primary-600 text-white'
                    : currentStep > step
                      ? 'bg-green-100 text-green-600'
                      : 'bg-secondary-100 text-secondary-400'
                }`}
              >
                {currentStep > step ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span className={`text-xs mt-1 ${currentStep === step ? 'text-primary-600 font-medium' : 'text-secondary-500'}`}>
                {step === 1 && 'Your Info'}
                {step === 2 && 'Business Details'}
                {step === 3 && 'Schedule'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="h-1 w-full bg-secondary-200 rounded"></div>
          </div>
          <div className="relative flex justify-between">
            <div className={`h-1 rounded-l-full ${currentStep >= 1 ? 'bg-primary-600' : 'bg-secondary-200'}`} style={{width: '50%'}}></div>
            <div className={`h-1 rounded-r-full ${currentStep >= 2 ? 'bg-primary-600' : 'bg-secondary-200'}`} style={{width: '50%'}}></div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-1">
                Company Name*
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>
        )}
        
        {/* Step 2: Business Information */}
        {currentStep === 2 && (
          <div>
            <div className="mb-4">
              <label htmlFor="website" className="block text-sm font-medium text-secondary-700 mb-1">
                Website URL*
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="monthlyTraffic" className="block text-sm font-medium text-secondary-700 mb-1">
                  Monthly Website Traffic
                </label>
                <select
                  id="monthlyTraffic"
                  name="monthlyTraffic"
                  value={formData.monthlyTraffic}
                  onChange={handleChange}
                  className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select...</option>
                  <option value="0-1000">0 - 1,000</option>
                  <option value="1001-10000">1,001 - 10,000</option>
                  <option value="10001-50000">10,001 - 50,000</option>
                  <option value="50001-100000">50,001 - 100,000</option>
                  <option value="100001+">100,001+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="currentLinks" className="block text-sm font-medium text-secondary-700 mb-1">
                  Current Backlinks (Approximate)
                </label>
                <select
                  id="currentLinks"
                  name="currentLinks"
                  value={formData.currentLinks}
                  onChange={handleChange}
                  className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select...</option>
                  <option value="0-50">0 - 50</option>
                  <option value="51-200">51 - 200</option>
                  <option value="201-500">201 - 500</option>
                  <option value="501-1000">501 - 1,000</option>
                  <option value="1001+">1,001+</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="goals" className="block text-sm font-medium text-secondary-700 mb-1">
                What are your primary growth goals?
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows="4"
                className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
            </div>
          </div>
        )}
        
        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <div>
            <p className="text-secondary-600 mb-4">
              Choose a date and time that works best for you. All times are in {formData.timezone}.
            </p>
            
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-secondary-700 mb-1">
                Select a Date*
              </label>
              <select
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a date...</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Select a Time*
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, time })}
                    className={`py-2 px-4 text-center rounded border ${
                      formData.time === time
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-secondary-300 hover:bg-secondary-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="timezone" className="block text-sm font-medium text-secondary-700 mb-1">
                Timezone*
              </label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Form Navigation */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="bg-white border border-secondary-300 text-secondary-700 px-4 py-2 rounded-md hover:bg-secondary-50"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-secondary-800"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-secondary-800"
            >
              Book Your Call
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;