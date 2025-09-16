import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { fetchBlogPosts, fetchAllBlogPosts, formatWordPressPosts } from '../../lib/wordpress';
import Image from 'next/image';

export default function Blog({ initialPage = 1 }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedContentType, setSelectedContentType] = useState('Content Type');
  const [selectedDate, setSelectedDate] = useState('Date');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on client-side only
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    
    // Initial check
    handleResize();
    
    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Create a debounced filter function to prevent excessive API calls
  const debouncedFetch = useRef(null);
  const isFilterChange = useRef(false);
  
  // Handle filter changes 
  const handleTopicChange = (e) => {
    isFilterChange.current = true;
    setSelectedTopic(e.target.value);
  };
  
  const handleContentTypeChange = (e) => {
    isFilterChange.current = true;
    setSelectedContentType(e.target.value);
  };
  
  const handleDateChange = (e) => {
    isFilterChange.current = true;
    setSelectedDate(e.target.value);
  };
  
  const handleSearchChange = (e) => {
    isFilterChange.current = true;
    setSearchQuery(e.target.value);
  };
  
  useEffect(() => {
    // If this is a filter change, reset to page 1
    if (isFilterChange.current && currentPage !== 1) {
      isFilterChange.current = false;
      // Reset to page 1 for new filter
      if (window.location.pathname !== '/link-building-blog/') {
        window.location.href = '/link-building-blog/';
        return;
      }
    }
    
    // Clear any pending debounced fetches
    if (debouncedFetch.current) {
      clearTimeout(debouncedFetch.current);
    }
    
    // Create a new debounced fetch
    debouncedFetch.current = setTimeout(async () => {
      setLoading(true);
      try {
        // Build filters object
        const filters = {
          search: searchQuery,
          topic: selectedTopic !== 'All Topics' ? selectedTopic : '',
          contentType: selectedContentType !== 'Content Type' ? selectedContentType : '',
          date: selectedDate !== 'Date' ? selectedDate : ''
        };
        
        // Directly fetch the current page of posts from WordPress API with filters
        console.log(`Fetching page ${currentPage} directly from WordPress API with filters...`);
        const result = await fetchBlogPosts(currentPage, 10, filters);
        
        if (result && result.posts) {
          console.log(`Successfully fetched page ${currentPage} with ${result.posts.length} posts`);
          console.log(`Total pages from WordPress: ${result.totalPages}`);
          
          const formattedPosts = formatWordPressPosts(result.posts);
          setPosts(formattedPosts);
          setTotalPages(result.totalPages);
          
          // Reset filter change flag
          isFilterChange.current = false;
        } else {
          console.error('No posts returned from WordPress API');
          setPosts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce delay
    
    // Cleanup function
    return () => {
      if (debouncedFetch.current) {
        clearTimeout(debouncedFetch.current);
      }
    };
  }, [currentPage, searchQuery, selectedTopic, selectedContentType, selectedDate]);
  
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      // Use client-side navigation to match the exact same URL format as the WordPress site
      if (newPage === 1) {
        // First page uses the index route
        window.location.href = '/link-building-blog/';
      } else {
        // Ensure all pages use the correct URL format that matches WordPress
        console.log(`Navigating to page ${newPage}`);
        window.location.href = `/link-building-blog/${newPage}/`;
      }
      window.scrollTo(0, 0);
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Extract plain text from HTML content for excerpts
  // Limit to approximately 20 words
  const extractExcerpt = (htmlContent, maxWords = 20) => {
    if (!htmlContent) return '';
    
    // Safe way to handle HTML content without using document (which is not available server-side)
    // Simple regex to strip HTML tags
    const text = htmlContent.replace(/<[^>]*>/g, '');
    
    // Split into words and limit to maxWords
    const words = text.trim().split(/\s+/);
    const limitedWords = words.slice(0, maxWords);
    
    // Add ellipsis if we truncated the text
    return words.length > maxWords 
      ? limitedWords.join(' ') + '...' 
      : limitedWords.join(' ');
  };

  // SEO metadata
  const seoTitle = 'Blog | Link Building Strategies & SEO Insights | GrowthOG';
  const seoDescription = 'Explore our blog for expert insights on link building, SEO strategies, and growth marketing tactics to help your business thrive online.';
  
  // JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'headline': 'GrowthOG Blog - Link Building and SEO Insights',
    'description': seoDescription,
    'publisher': {
      '@type': 'Organization',
      'name': 'GrowthOG',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://growthog.com/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://growthog.com/link-building-blog/'
    }
  };

  return (
    <Layout
      seo={{
        title: seoTitle,
        description: seoDescription,
        canonical: 'https://growthog.com/link-building-blog/',
        openGraph: {
          title: seoTitle,
          description: seoDescription,
          type: 'website',
          url: 'https://growthog.com/link-building-blog/'
        }
      }}
    >
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Blog Header */}
            <h1 className="text-4xl font-bold mb-2">Blog</h1>
            <p className="text-secondary-600 mb-8">
              Industry insights, link building strategies, and SaaS growth tactics
            </p>

            {/* Filter Bar - Mobile Collapsible Version */}
            <div className="border border-secondary-200 rounded-lg p-4 mb-8">
              {/* Mobile Filter Toggle Button */}
              <div className="md:hidden mb-4">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex justify-between items-center p-2 border border-secondary-300 rounded-md bg-white"
                >
                  <span className="font-medium">Filters</span>
                  <svg 
                    className={`h-5 w-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Filter Controls - Always visible on desktop, conditionally on mobile */}
              <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <select 
                      className="w-full rounded-md border-secondary-300 px-3 py-2 text-sm"
                      value={selectedTopic}
                      onChange={handleTopicChange}
                    >
                      <option value="All Topics">All Topics</option>
                      <option value="Link Building">Link Building</option>
                      <option value="SEO">SEO</option>
                      <option value="Content Marketing">Content Marketing</option>
                    </select>
                  </div>
                  <div className="relative flex-grow">
                    <select 
                      className="w-full rounded-md border-secondary-300 px-3 py-2 text-sm"
                      value={selectedContentType}
                      onChange={handleContentTypeChange}
                    >
                      <option value="Content Type">Content Type</option>
                      <option value="Guides">Guides</option>
                      <option value="Case Studies">Case Studies</option>
                      <option value="How-to">How-to</option>
                    </select>
                  </div>
                  <div className="relative flex-grow">
                    <select 
                      className="w-full rounded-md border-secondary-300 px-3 py-2 text-sm"
                      value={selectedDate}
                      onChange={handleDateChange}
                    >
                      <option value="Date">Date</option>
                      <option value="Newest First">Newest First</option>
                      <option value="Oldest First">Oldest First</option>
                      <option value="Last 7 days">Last 7 days</option>
                      <option value="Last 30 days">Last 30 days</option>
                      <option value="Last 3 months">Last 3 months</option>
                      <option value="Last year">Last year</option>
                    </select>
                  </div>
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search Blog" 
                      className="pl-10 w-full rounded-md border-secondary-300 px-3 py-2 text-sm"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-2">All Blog Articles</h2>
              <p className="text-secondary-600 mb-6">Complete collection of our link building and SEO strategies</p>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : posts.length > 0 ? (
                <div className="grid-responsive-2">
                  {/* Since we're fetching the actual page from WordPress, no need to slice */}
                  {posts.map((post, index) => (
                      <div key={post.id} className="blog-card overflow-fix">
                        <div className="p-5 sm:p-6">
                          <div className="text-xs font-medium text-black mb-2">LINK BUILDING</div>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            <Link 
                              href={post.path ? post.path : `/${post.slug}/`} 
                              className="hover:text-primary-600 text-black"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <div className="text-gray-700 mb-4 overflow-hidden text-ellipsis text-base sm:text-lg" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                            {extractExcerpt(post.excerpt)}
                          </div>
                          <div className="flex flex-wrap items-center text-sm text-gray-600">
                            <span className="flex items-center">
                              {post.author && (
                                <>
                                  <span className="mr-1">👤</span> {post.author}
                                  <span className="mx-2">•</span>
                                </>
                              )}
                              <span className="mr-1">📅</span> {formatDate(post.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-secondary-600">No blog posts found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-secondary-200 py-8">
          <div className="container-custom">
            <div className="flex justify-center overflow-x-auto pb-2">
              <nav className="inline-flex shadow-sm -space-x-px">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 sm:px-3 py-2 border border-secondary-300 ${
                    currentPage === 1 ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed' : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  &lt; Prev
                </button>
                
                {/* Display limited page numbers on mobile */}
                {[...Array(totalPages)].map((_, i) => {
                  // On mobile, only show current page, first, last, and immediate neighbors
                  const pageNum = i + 1;
                  const showOnMobile = 
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    pageNum === currentPage || 
                    pageNum === currentPage - 1 || 
                    pageNum === currentPage + 1;
                    
                  if (!showOnMobile && isMobile) {
                    // If it's the page after the first or before the last, show dots
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return (
                        <span 
                          key={pageNum}
                          className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-secondary-700"
                        >
                          ...
                        </span>
                      );
                    }
                    // Skip other pages on mobile
                    return null;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-3 sm:px-4 py-2 border border-secondary-300 ${
                        currentPage === pageNum ? 'bg-primary-50 text-primary-600 border-primary-500' : 'bg-white text-secondary-700 hover:bg-secondary-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }).filter(Boolean)}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 sm:px-3 py-2 border border-secondary-300 ${
                    currentPage === totalPages ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed' : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  Next &gt;
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
