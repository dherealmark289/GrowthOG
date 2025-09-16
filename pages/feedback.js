import { useState } from 'react';
import Layout from '../components/layout/Layout';
import FeedbackForm from '../components/feedback/FeedbackForm';

export default function Feedback() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <Layout
      seo={{
        title: 'Feedback | GrowthOG',
        description: 'We value your feedback! Share your thoughts, suggestions, or ideas to help us improve our services.',
      }}
    >
      {/* Hero Section */}
      <div className="pt-20 pb-16 md:pt-28 md:pb-24 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
              We Value Your Feedback
            </h1>
            <p className="mt-6 text-xl text-secondary-600">
              Your feedback helps us improve our services and provide a better experience for all our clients.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div className="text-center py-12 bg-green-50 rounded-xl border border-green-200 px-6">
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
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                  Thank you for your feedback!
                </h2>
                <p className="text-lg text-secondary-600 mb-6">
                  We appreciate you taking the time to share your thoughts with us. Your feedback is valuable and helps us improve our services.
                </p>
                <p className="text-secondary-600">
                  Our team will review your feedback and may reach out if we have any follow-up questions.
                </p>
              </div>
            ) : (
              <div>
                <div className="bg-white rounded-xl shadow-soft p-8">
                  <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
                </div>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    More Ways to Reach Us
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: 'Email Us',
                        description: 'Send us an email at support@growthog.com',
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ),
                      },
                      {
                        title: 'Call Us',
                        description: 'Give us a call at (555) 123-4567',
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        ),
                      },
                      {
                        title: 'Social Media',
                        description: 'Reach out to us on Twitter or LinkedIn',
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        ),
                      },
                    ].map((method, index) => (
                      <div key={index} className="bg-secondary-50 rounded-lg p-6 text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                          {method.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-secondary-900 mb-2">{method.title}</h3>
                        <p className="text-secondary-600">{method.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
