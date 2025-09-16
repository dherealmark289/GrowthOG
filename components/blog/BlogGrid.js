import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const BlogGrid = ({ posts, showPagination = false, totalPages = 1, currentPage = 1 }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-600">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white border border-black rounded-xl overflow-hidden hover:shadow-medium transition-shadow"
          >
            <Link href={post.wpSlug ? `/${post.wpSlug}` : `/${post.slug}`}>
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-black mb-2">
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full font-medium text-xs">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-black mb-4 line-clamp-2">
                  {post.excerpt && post.excerpt.split(' ').slice(0, 20).join(' ')}
                  {post.excerpt && post.excerpt.split(' ').length > 20 ? '...' : ''}
                </p>
                <div className="flex items-center text-sm text-black">
                  <CalendarIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <ClockIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <Link
              href={currentPage > 1 ? `/link-building-blog?page=${currentPage - 1}` : '#'}
              className={`relative inline-flex items-center px-4 py-2 border border-secondary-300 rounded-l-md ${
                currentPage === 1 
                  ? 'bg-secondary-50 text-secondary-400 cursor-not-allowed' 
                  : 'bg-white text-secondary-700 hover:bg-secondary-50'
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <Link
                  key={page}
                  href={`/link-building-blog?page=${page}`}
                  className={`relative inline-flex items-center px-4 py-2 border border-secondary-300 ${
                    currentPage === page
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  {page}
                </Link>
              );
            })}
            
            <Link
              href={currentPage < totalPages ? `/link-building-blog?page=${currentPage + 1}` : '#'}
              className={`relative inline-flex items-center px-4 py-2 border border-secondary-300 rounded-r-md ${
                currentPage === totalPages 
                  ? 'bg-secondary-50 text-secondary-400 cursor-not-allowed' 
                  : 'bg-white text-secondary-700 hover:bg-secondary-50'
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
