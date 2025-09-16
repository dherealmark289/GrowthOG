import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

export default function DashboardFeedback() {
  const { user } = useAuth();
  const [feedbackType, setFeedbackType] = useState('feature_request');
  const [feedback, setFeedback] = useState('');
  const [satisfaction, setSatisfaction] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set loading state
    setIsSubmitting(true);
    
    // In a real app, this would make an API call to save the feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFeedbackType('feature_request');
      setFeedback('');
      setSatisfaction(4);
    }, 1000);
  };
  
  return (
    <DashboardLayout
      seo={{
        title: 'Feedback',
        description: 'Share your feedback and suggestions to help us improve',
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Feedback</h1>
          <p className="mt-1 text-sm text-secondary-600">
            We appreciate your feedback and suggestions to help us improve our platform.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <ChatBubbleBottomCenterTextIcon 
                  className="mx-auto h-12 w-12 text-primary-600" 
                  aria-hidden="true" 
                />
                <h2 className="mt-4 text-lg font-medium text-secondary-900">Thank you for your feedback!</h2>
                <p className="mt-2 text-sm text-secondary-600">
                  We appreciate you taking the time to share your thoughts with us. 
                  Your feedback is invaluable in helping us improve our platform.
                </p>
                <div className="mt-6">
                  <Button 
                    variant="primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Feedback
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="feedbackType" className="block text-sm font-medium text-secondary-700">
                      Feedback Type
                    </label>
                    <select
                      id="feedbackType"
                      name="feedbackType"
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    >
                      <option value="feature_request">Feature Request</option>
                      <option value="bug_report">Bug Report</option>
                      <option value="improvement">Suggestion for Improvement</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="satisfaction" className="block text-sm font-medium text-secondary-700">
                      Overall Satisfaction
                    </label>
                    <div className="mt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary-500">Very Dissatisfied</span>
                        <span className="text-xs text-secondary-500">Very Satisfied</span>
                      </div>
                      <input
                        id="satisfaction"
                        name="satisfaction"
                        type="range"
                        min="1"
                        max="5"
                        value={satisfaction}
                        onChange={(e) => setSatisfaction(parseInt(e.target.value))}
                        className="mt-2 w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span key={value} className="text-sm text-secondary-500">{value}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-secondary-700">
                      Your Feedback
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="feedback"
                        name="feedback"
                        rows={5}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Please describe your feedback, suggestion, or the issue you're experiencing in detail..."
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-secondary-500">
                      Your feedback will be associated with your account ({user?.email}).
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Card>
          
          {!isSubmitted && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Other Ways to Reach Us</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <h3 className="text-base font-medium text-secondary-900">Email Support</h3>
                  <p className="mt-2 text-sm text-secondary-600">
                    If you prefer to reach out via email, you can contact our support team directly.
                  </p>
                  <div className="mt-4">
                    <a 
                      href="mailto:support@growthog.com" 
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      support@growthog.com
                    </a>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-base font-medium text-secondary-900">Schedule a Call</h3>
                  <p className="mt-2 text-sm text-secondary-600">
                    Want to discuss your feedback directly? Schedule a call with our customer success team.
                  </p>
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      href="/book-call"
                    >
                      Book a Call
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
