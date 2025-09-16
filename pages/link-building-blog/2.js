import React from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { fetchBlogPosts, formatWordPressPosts } from '../../lib/wordpress';

export default function Page2({ posts, totalPages }) {
  // Handle navigation to other pages
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      // Use client-side navigation to match the exact same URL format as the WordPress site
      if (newPage === 1) {
        // First page uses the index route
        window.location.href = '/link-building-blog/';
      } else {
        // Other pages use the exact same format as the WordPress site
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
  const seoTitle = 'Blog - Page 2 | Link Building Strategies & SEO Insights | GrowthOG';
  const seoDescription = 'Explore page 2 of our blog for expert insights on link building, SEO strategies, and growth marketing tactics to help your business thrive online.';
  
  return (
    <Layout
      seo={{
        title: seoTitle,
        description: seoDescription,
        canonical: 'https://growthog.com/link-building-blog/2/',
        openGraph: {
          title: seoTitle,
          description: seoDescription,
          type: 'website',
          url: 'https://growthog.com/link-building-blog/2/'
        }
      }}
    >
      <div className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Blog Header */}
            <h1 className="text-4xl font-bold mb-2">Blog - Page 2</h1>
            <p className="text-secondary-600 mb-8">
              Industry insights, link building strategies, and SaaS growth tactics
            </p>

            {/* Blog Posts Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-2">All Blog Articles ({posts.length})</h2>
              <p className="text-secondary-600 mb-6">Complete collection of our link building and SEO strategies</p>

              {posts.length > 0 ? (
                <div className="grid-responsive-2">
                  {posts.map((post) => (
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
            <div className="flex justify-center">
              <nav className="inline-flex shadow-sm -space-x-px">
                <button 
                  onClick={() => handlePageChange(1)}
                  className="relative inline-flex items-center px-3 py-2 border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50"
                >
                  &lt; Prev
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-secondary-300 ${
                      2 === i + 1 ? 'bg-primary-50 text-primary-600 border-primary-500' : 'bg-white text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(3)}
                  className="relative inline-flex items-center px-3 py-2 border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50"
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

// Server-side pre-rendering
export async function getServerSideProps() {
  console.log('Starting server-side processing for page 2');
  
  try {
    // Direct API call to WordPress API for page 2
    console.log('Fetching page 2 posts from WordPress API');
    const result = await fetchBlogPosts(2, 10);
    
    if (result && result.posts && result.posts.length > 0) {
      console.log(`Successfully fetched ${result.posts.length} posts for page 2`);
      
      // Format posts for display
      const formattedPosts = formatWordPressPosts(result.posts);
      
      return {
        props: {
          posts: formattedPosts,
          totalPages: result.totalPages
        }
      };
    } else {
      console.error('No posts returned from WordPress API for page 2');
      return {
        props: {
          posts: [],
          totalPages: 6 // Default total pages
        }
      };
    }
  } catch (error) {
    console.error('Error fetching page 2 content:', error);
    return {
      props: {
        posts: [],
        totalPages: 6 // Default total pages
      }
    };
  }
}