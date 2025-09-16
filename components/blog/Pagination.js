import React from 'react';
import Link from 'next/link';

const Pagination = ({ totalPages = 6, currentPage = 1 }) => {
  // Create an array of page numbers to display
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Define the page paths based on the page number
  const getPagePath = (pageNum) => {
    switch(pageNum) {
      case 1:
        return '/';
      case 2:
        return '/services';
      case 3:
        return '/case-studies';
      case 4:
        return '/pricing';
      case 5:
        return '/about-us';
      case 6:
        return '/resources';
      default:
        return `/page/${pageNum}`;
    }
  };
  
  return (
    <div className="flex justify-center items-center py-6 mt-4">
      <ul className="flex space-x-1">
        {pages.map(page => (
          <li key={page}>
            <Link
              href={getPagePath(page)}
              className={`inline-flex items-center justify-center w-8 h-8 ${
                currentPage === page
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;