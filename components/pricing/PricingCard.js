import React from 'react';
import Button from '../ui/Button';
import { CheckIcon } from '@heroicons/react/24/outline';

const PricingCard = ({ plan, featured = false }) => {
  return (
    <div 
      className={`bg-white rounded-xl ${
        featured ? 'ring-2 ring-primary-500 shadow-medium' : 'border border-secondary-200 shadow-soft'
      } overflow-hidden transition-all duration-200 hover:shadow-medium`}
    >
      {featured && (
        <div className="bg-primary-500 text-white text-center py-1.5 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-secondary-900">{plan.name}</h3>
        <p className="mt-2 text-secondary-600">{plan.description}</p>
        
        <div className="mt-6 flex items-baseline">
          <span className="text-4xl font-extrabold text-secondary-900">{plan.price}</span>
          <span className="ml-1 text-secondary-500">{plan.frequency}</span>
        </div>
        
        <div className="mt-8">
          <Button 
            href="/book-call" 
            variant={featured ? 'primary' : 'outline'} 
            fullWidth
          >
            {plan.cta}
          </Button>
        </div>
      </div>
      
      <div className="px-6 pt-2 pb-6">
        <h4 className="text-sm font-semibold text-secondary-900 uppercase tracking-wide mb-4">What's included</h4>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-500 mt-0.5" />
              <span className="ml-3 text-secondary-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
