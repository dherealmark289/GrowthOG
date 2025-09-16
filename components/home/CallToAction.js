import React from 'react';
import Button from '../ui/Button';

const CallToAction = () => {
  return (
    <div className="bg-primary-600">
      <div className="container-custom py-16 md:py-20">
        <div className="md:flex md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to accelerate your growth?
            </h2>
            <p className="mt-3 text-lg text-primary-100">
              Book a free strategy call with our team to discuss your goals and see how we can help you achieve them.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:ml-8">
            <Button 
              href="/book-call" 
              variant="light" 
              size="lg"
              className="font-semibold"
            >
              Book Your Free Strategy Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
