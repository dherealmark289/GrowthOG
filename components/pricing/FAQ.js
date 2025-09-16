import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQ = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 space-y-4">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6">Frequently Asked Questions</h2>
      
      {questions.map((question, index) => (
        <div 
          key={index} 
          className={`border rounded-lg overflow-hidden ${
            openIndex === index ? 'border-primary-300' : 'border-secondary-200'
          }`}
        >
          <button
            onClick={() => toggleQuestion(index)}
            className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span className="text-lg font-medium text-secondary-900">{question.question}</span>
            {openIndex === index ? (
              <ChevronUpIcon className="h-5 w-5 text-primary-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-secondary-500" />
            )}
          </button>
          
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-secondary-600">{question.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
