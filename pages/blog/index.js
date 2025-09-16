import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { fetchBlogPosts, formatWordPressPosts } from '../../lib/wordpress';
import Image from 'next/image';

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const result = await fetchBlogPosts(currentPage);
        const formattedPosts = formatWordPressPosts(result.posts);
        setPosts(formattedPosts);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, [currentPage]);
  
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
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

            {/* Filter Bar */}
            <div className="border border-secondary-200 rounded-lg p-4 mb-8 flex flex-wrap gap-4">
              <div className="relative flex-grow">
                <select className="w-full rounded-md border-secondary-300 px-3 py-2 text-sm">
                  <option>All Topics</option>
                  <option>Link Building</option>
                  <option>SEO</option>
                  <option>Content Marketing</option>
                </select>
              </div>
              <div className="relative flex-grow">
                <select className="w-full rounded-md border-secondary-300 px-3 py-2 text-sm">
                  <option>Content Type</option>
                  <option>Guides</option>
                  <option>Case Studies</option>
                  <option>How-to</option>
                </select>
              </div>
              <div className="relative flex-grow">
                <select className="w-full rounded-md border-secondary-300 px-3 py-2 text-sm">
                  <option>Date</option>
                  <option>Newest First</option>
                  <option>Oldest First</option>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Blog Posts Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-2">Popular Articles</h2>
              <p className="text-secondary-600 mb-6">Our most read guides on link building strategies</p>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : posts.length > 0 ? (
                <div className="grid-responsive-2">
                  {posts.map((post, index) => (
                    <div key={post.id} className="blog-card overflow-fix">
                      <div className="p-5 sm:p-6">
                        <div className="text-xs font-medium text-black mb-2">LINK BUILDING</div>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          <Link 
                            href={post.path ? post.path : `/link-building-blog/${post.slug}`} 
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
            <div className="flex justify-center">
              <nav className="inline-flex shadow-sm -space-x-px">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-2 border border-secondary-300 ${
                    currentPage === 1 ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed' : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  &lt; Prev
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-secondary-300 ${
                      currentPage === i + 1 ? 'bg-primary-50 text-primary-600 border-primary-500' : 'bg-white text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-3 py-2 border border-secondary-300 ${
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
