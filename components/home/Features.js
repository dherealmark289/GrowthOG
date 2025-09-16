import React from 'react';
import {
  ChartBarIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  ArrowPathIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Content Marketing',
    description: 'Create compelling content that attracts, engages, and converts your target audience.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Search Engine Optimization',
    description: 'Improve your visibility in search results and drive consistent organic traffic.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Paid Media Management',
    description: 'Strategically allocate your ad spend to maximize ROI across multiple platforms.',
    icon: ChartBarIcon,
  },
  {
    name: 'Email Marketing',
    description: 'Nurture leads and drive repeat purchases with targeted email campaigns.',
    icon: EnvelopeIcon,
  },
  {
    name: 'Conversion Rate Optimization',
    description: 'Systematically improve your website to convert more visitors into customers.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Analytics & Reporting',
    description: 'Gain valuable insights with comprehensive tracking and data-driven reports.',
    icon: PresentationChartLineIcon,
  },
];

const Features = () => {
  return (
    <div className="bg-white py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            Comprehensive Growth Marketing Services
          </h2>
          <p className="mt-4 text-lg text-secondary-600">
            We offer a full range of marketing services to help you attract, convert, and retain more customers.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white rounded-xl shadow-soft p-6 border border-secondary-100 hover:border-primary-200 hover:shadow-medium transition-all">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900">{feature.name}</h3>
              <p className="mt-2 text-secondary-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
