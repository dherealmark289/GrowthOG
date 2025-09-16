import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { fetchBlogPosts, fetchPostBySlug, formatWordPressPost, formatWordPressPosts } from '../../lib/wordpress';
import TableOfContents from '../../components/blog/TableOfContents';
import CommentSection from '../../components/blog/CommentSection';
import { useEffect } from 'react';

export default function BlogPost({ post, relatedPosts }) {
  const router = useRouter();
  
  // Add IDs to headings for table of contents
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const content = document.querySelector('.blog-content');
      if (content) {
        const headings = content.querySelectorAll('h2, h3, h4');
        headings.forEach((heading) => {
          if (!heading.id) {
            const id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            heading.id = id;
          }
        });
      }
    }
  }, [post]);
  
  // If the page is still loading or the post doesn't exist
  if (router.isFallback || !post) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading post...</p>
        </div>
      </Layout>
    );
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Estimate reading time (1 minute per 200 words)
  const calculateReadTime = (content) => {
    if (!content) return '5 min read';
    
    // Safe way to handle HTML content without using document (which is not available server-side)
    // Simple regex to strip HTML tags
    const text = content.replace(/<[^>]*>/g, '');
    
    // Count words (split by whitespace)
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    
    return `${minutes} min read`;
  };

  // Get a clean excerpt for SEO description
  const getCleanDescription = (htmlContent) => {
    if (!htmlContent) return '';
    // Remove HTML tags and limit to 160 characters for SEO
    return htmlContent.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  };
  
  // Create a clean description for SEO
  const seoDescription = getCleanDescription(post.excerpt);
  
  // Schema.org Article structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': seoDescription,
    'image': post.featured_image || 'https://growthog.com/default-blog-image.jpg',
    'datePublished': post.date,
    'dateModified': post.modified,
    'author': {
      '@type': 'Person',
      'name': post.author
    },
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
      '@id': post.path 
        ? `https://growthog.com${post.path}/` 
        : `https://growthog.com/link-building-blog/${post.slug}/`
    }
  };

  return (
    <Layout
      seo={{
        title: `${post.title} | GrowthOG Blog`,
        description: seoDescription,
        // Use WordPress path if available, otherwise fallback to old path
        canonical: post.path 
          ? `https://growthog.com${post.path}/` 
          : `https://growthog.com/link-building-blog/${post.slug}/`,
        openGraph: {
          title: post.title,
          description: seoDescription,
          type: 'article',
          url: post.path 
            ? `https://growthog.com${post.path}/` 
            : `https://growthog.com/link-building-blog/${post.slug}/`,
          images: [
            {
              url: post.featured_image || 'https://growthog.com/default-blog-image.jpg',
              width: 1200,
              height: 630,
              alt: post.title,
            }
          ],
          article: {
            publishedTime: post.date,
            modifiedTime: post.modified,
            authors: [post.author],
            tags: ['Link Building', 'SEO', 'Growth Marketing'],
          }
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
      
      {/* Hero Section with Black Background */}
      <div className="bg-black text-white pt-20 md:pt-32 pb-10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-1" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-1" />
                <span>{calculateReadTime(post.content)}</span>
              </div>
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 mr-1" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Grid Layout */}
      <div className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Back to Blog Link */}
            <div className="md:hidden mb-4">
              <Link
                href="/link-building-blog"
                className="inline-flex items-center text-secondary-600 hover:text-primary-600"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Blog
              </Link>
            </div>

            {/* Left Sidebar - Table of Contents (Hidden on Mobile) */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5">
              <div className="md:sticky md:top-24">
                <div className="mb-6">
                  <Link
                    href="/link-building-blog"
                    className="inline-flex items-center text-secondary-600 hover:text-primary-600"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Blog
                  </Link>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 text-secondary-900">TABLE OF CONTENTS</h2>
                  <TableOfContents content={post.content} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/4 lg:w-3/5">
              {/* Social Share Buttons */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <span className="mr-3 font-medium text-secondary-700">Share Article</span>
                  <div className="flex space-x-2">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.path 
                         ? `https://growthog.com${post.path}/` 
                         : `https://growthog.com/link-building-blog/${post.slug}/`)}`} 
                       target="_blank" rel="noopener noreferrer"
                       className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700">
                      <span className="sr-only">Share on Facebook</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.path 
                         ? `https://growthog.com${post.path}/` 
                         : `https://growthog.com/link-building-blog/${post.slug}/`)}`}
                       target="_blank" rel="noopener noreferrer"
                       className="w-8 h-8 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500">
                      <span className="sr-only">Share on Twitter</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.path 
                         ? `https://growthog.com${post.path}/` 
                         : `https://growthog.com/link-building-blog/${post.slug}/`)}`}
                       target="_blank" rel="noopener noreferrer"
                       className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800">
                      <span className="sr-only">Share on LinkedIn</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=Check out this article: ${encodeURIComponent(post.path 
                         ? `https://growthog.com${post.path}/` 
                         : `https://growthog.com/link-building-blog/${post.slug}/`)}`}
                       className="w-8 h-8 flex items-center justify-center bg-secondary-600 text-white rounded-full hover:bg-secondary-700">
                      <span className="sr-only">Share via Email</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    width={900}
                    height={500}
                    priority
                    className="object-cover w-full"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="prose prose-lg max-w-none blog-content">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="text-secondary-700 font-medium">Tags:</span>
                  {['link building strategy'].map((tag, index) => (
                    <Link
                      key={index}
                      href={`/link-building-blog?category=${encodeURIComponent(tag)}`}
                      className="inline-block px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <CommentSection />
              </div>
            </div>

            {/* Right Sidebar - CTA and Related Content */}
            <div className="md:w-1/4 lg:w-1/5">
              <div className="md:sticky md:top-24 space-y-8">
                {/* Access Dashboard CTA */}
                <div className="bg-black text-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">Access Your GrowthOG Dashboard</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Track your link building progress and manage your campaigns
                  </p>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    <span className="text-black">Dashboard</span>
                  </Link>
                </div>

                {/* Want Backlinks Section */}
                <div className="bg-black rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">Want backlinks on autopilot?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Get expert link building services from GrowthOG
                  </p>
                  <a
                    href="/book-call"
                    className="flex items-center justify-center gap-2 w-full bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-black">Book a Call</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const result = await fetchBlogPosts(1, 100); // Get as many posts as possible for paths
    const posts = formatWordPressPosts(result.posts);
    
    const paths = posts.map(post => ({
      params: { slug: post.slug },
    }));

    return { 
      paths, 
      fallback: true // Enable fallback for posts not in initial list
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  try {
    // Fetch the main post
    const postData = await fetchPostBySlug(params.slug);
    
    if (!postData) {
      return {
        notFound: true,
      };
    }
    
    const post = formatWordPressPost(postData);
    
    // Fetch related posts (same category if possible)
    const relatedResult = await fetchBlogPosts(1, 3);
    let relatedPosts = formatWordPressPosts(relatedResult.posts)
      .filter(p => p.id !== post.id)
      .slice(0, 3);
    
    return {
      props: {
        post,
        relatedPosts,
      },
      revalidate: 60, // Revalidate pages after 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      notFound: true,
    };
  }
}
