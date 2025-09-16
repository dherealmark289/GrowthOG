import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

const BlogFilter = ({ categories, onFilterChange, activeCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category) => {
    onFilterChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="hidden md:flex space-x-2">
          <button
            onClick={() => onFilterChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              !activeCategory
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile filter dropdown */}
        <div className="md:hidden w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white border border-secondary-300 rounded-md shadow-sm text-secondary-700"
          >
            <span>{activeCategory || 'All Posts'}</span>
            <FunnelIcon className="ml-2 h-5 w-5 text-secondary-500" aria-hidden="true" />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-secondary-200 py-1">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  !activeCategory ? 'bg-primary-50 text-primary-600' : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    activeCategory === category ? 'bg-primary-50 text-primary-600' : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full md:w-64 px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-secondary-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;
