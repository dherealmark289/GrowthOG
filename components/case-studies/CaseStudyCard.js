import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CaseStudyCard = ({ caseStudy }) => {
  return (
    <Link 
      href={`/case-studies/${caseStudy.slug}`}
      className="block group"
    >
      <div className="bg-white rounded-xl shadow-soft overflow-hidden group-hover:shadow-medium transition-shadow">
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src={caseStudy.featuredImage}
            alt={caseStudy.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 to-transparent flex items-end">
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-white/90 text-primary-600 rounded-full font-medium text-xs mb-2">
                {caseStudy.industry}
              </span>
              <h3 className="text-xl font-semibold text-white group-hover:text-primary-100 transition-colors line-clamp-2">
                {caseStudy.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-secondary-600 mb-4 line-clamp-3">
            {caseStudy.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {caseStudy.results.slice(0, 3).map((result, index) => (
              <span 
                key={index}
                className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-medium"
              >
                {result}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
