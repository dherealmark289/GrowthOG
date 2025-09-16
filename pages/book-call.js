import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

export default function BookCall() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };
  
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
    // In real app, this would send data to a backend
    console.log('Form submitted:', formData);
    nextStep(); // Move to thank you step
  };
  
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM'
  ];

  const whatToExpect = [
    {
      title: 'Understand Your Business',
      description: 'We will discuss your business model, target audience, and current marketing efforts.'
    },
    {
      title: 'Identify Growth Opportunities',
      description: 'We will help identify the highest-impact marketing opportunities for your business.'
    },
    {
      title: 'Tailored Recommendations',
      description: 'You will receive personalized recommendations based on your specific situation.'
    },
    {
      title: 'No Pressure',
      description: 'This is a genuine strategy session, not a high-pressure sales call.'
    }
  ];

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  return (
    <Layout
      seo={{
        title: 'Book a Strategy Call | GrowthOG',
        description: 'Schedule a free strategy call with our team to discuss your growth goals and how we can help you achieve them.',
      }}
    >
      {/* Hero Section */}
      <div className="pt-20 pb-16 md:pt-28 md:pb-24 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
              Book a Strategy Call
            </h1>
            <p className="mt-6 text-xl text-secondary-600">
              Schedule a free 30-minute strategy call with our team to discuss your growth goals and how we can help you achieve them.
            </p>
            <button
              onClick={openModal}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Book Your Call Now
            </button>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">
              What to Expect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {whatToExpect.map((item, index) => (
                <div key={index} className="bg-secondary-50 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{item.title}</h3>
                      <p className="text-secondary-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button
                onClick={openModal}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Book Your Call Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-secondary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900">What clients say about our strategy calls</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The strategy call was incredibly valuable. The team took the time to understand our business and provided actionable insights we could implement right away.",
                name: "Michael Robinson",
                role: "CEO, TechStart"
              },
              {
                quote: "I was impressed by how prepared the team was for our call. They had done their research and offered tailored recommendations specific to our industry.",
                name: "Sarah Williams",
                role: "Marketing Director, EcomBrand"
              },
              {
                quote: "The strategy call helped us identify growth opportunities we hadn't considered. Their expertise was evident, and there was no pressure to sign up.",
                name: "David Chen",
                role: "Founder, ServicePro"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-secondary-600 mt-3 italic">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-secondary-900">{testimonial.name}</p>
                  <p className="text-sm text-secondary-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={openModal}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Book Your Call Now
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  question: "How long is the strategy call?",
                  answer: "Our strategy calls typically last 30 minutes. This gives us enough time to understand your business and provide valuable insights without taking too much of your time."
                },
                {
                  question: "Is there any cost for the strategy call?",
                  answer: "No, the strategy call is completely free. We offer these calls to provide value and see if we're a good fit to work together."
                },
                {
                  question: "Do I need to prepare anything for the call?",
                  answer: "While no preparation is required, it can be helpful to have a general idea of your current marketing efforts and specific growth challenges you're facing."
                },
                {
                  question: "What happens after the call?",
                  answer: "After the call, we'll send you a follow-up email with a summary of our discussion and recommendations. If we believe we can help you achieve your goals, we'll include information about our services."
                },
                {
                  question: "Can I invite other team members to the call?",
                  answer: "Absolutely! We encourage you to invite any team members who are involved in your marketing and growth initiatives."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-secondary-200 pb-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{faq.question}</h3>
                  <p className="text-secondary-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button
                onClick={openModal}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Book Your Call Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-secondary-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              {/* Modal Header */}
              <div className="bg-secondary-50 px-6 py-4 border-b border-secondary-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-secondary-900">
                    {currentStep === 1 && "Your Information"}
                    {currentStep === 2 && "About Your Business"}
                    {currentStep === 3 && "Choose a Date & Time"}
                    {currentStep === 4 && "Booking Confirmed!"}
                  </h3>
                  <button onClick={closeModal} className="text-secondary-500 hover:text-secondary-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Progress Steps */}
                {currentStep < 4 && (
                  <div className="mt-4 flex">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex-1">
                        <div className={`h-2 rounded-full ${currentStep >= step ? 'bg-primary-600' : 'bg-secondary-200'}`}></div>
                        <div className="text-xs mt-1 text-center">Step {step}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4">
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div>
                    <p className="text-secondary-600 mb-4">
                      Please provide your contact information so we can get in touch with you.
                    </p>
                    
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
                    <p className="text-secondary-600 mb-4">
                      Help us understand your business better so we can prepare for our call.
                    </p>
                    
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
                
                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="text-center py-6">
                    <svg 
                      className="h-16 w-16 text-green-500 mx-auto mb-4" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    
                    <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                      Your call is scheduled!
                    </h3>
                    
                    <p className="text-secondary-600 mb-6">
                      We've sent a calendar invitation to <strong>{formData.email}</strong>.<br />
                      Looking forward to speaking with you on <strong>
                        {formData.date && new Date(formData.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </strong> at <strong>{formData.time} {formData.timezone}</strong>.
                    </p>
                    
                    <div className="mt-6">
                      <button
                        onClick={closeModal}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Footer with Action Buttons */}
              {currentStep < 4 && (
                <div className="bg-secondary-50 px-6 py-4 flex justify-between border-t border-secondary-200">
                  {currentStep > 1 ? (
                    <button
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-secondary-300 text-base font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div> // Empty div for spacing
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="border-t border-secondary-200 py-8">
        <div className="container-custom">
          <div className="flex justify-center">
            <nav className="inline-flex shadow-sm -space-x-px">
              <Link href="/" className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                1
              </Link>
              <Link href="/services" className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                2
              </Link>
              <Link href="/case-studies" className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                3
              </Link>
              <Link href="/pricing" className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                4
              </Link>
              <Link href="/resources" className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                5
              </Link>
              <Link href="/about" className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50">
                6
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
}
