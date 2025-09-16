import React from 'react';
import Blog from './index';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { fetchAllBlogPosts, fetchBlogPosts } from '../../lib/wordpress';

export default function BlogPageOrCatchAll({ type, initialPage, notFound }) {
  const router = useRouter();
  
  // Show 404 for invalid pages
  if (notFound) {
    return <ErrorPage statusCode={404} />;
  }
  
  // If it's a pagination page, render the Blog component with the initialPage
  if (type === 'pagination') {
    return <Blog initialPage={initialPage} />;
  }
  
  // Otherwise it's an unknown slug, so show 404
  return <ErrorPage statusCode={404} />;
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  
  // Special case for page 2 - always return notFound to prevent redirect loops
  if (slug === '2') {
    console.log('Skipping page 2 handling in dynamic route - has dedicated file');
    return {
      props: {
        notFound: true
      }
    };
  }
  
  // Check if the slug is numeric and potentially a pagination page
  if (/^\d+$/.test(slug)) {
    const pageNumber = parseInt(slug, 10);
    
    if (pageNumber >= 3) {
      try {
        console.log(`Checking if pagination page ${pageNumber} exists in WordPress`);
        
        // Make a direct API call to get posts for that page
        const { posts, totalPages } = await fetchBlogPosts(pageNumber, 10);
        
        // If WordPress returned posts for this page, we'll show it
        if (posts && posts.length > 0 && pageNumber <= totalPages) {
          console.log(`WordPress returned ${posts.length} posts for page ${pageNumber} of ${totalPages}`);
          return {
            props: {
              type: 'pagination',
              initialPage: pageNumber
            }
          };
        } else {
          console.log(`No posts found for page ${pageNumber}, or page exceeds total of ${totalPages}`);
        }
      } catch (error) {
        console.error('Error fetching blog posts for pagination:', error);
        
        // Fallback to counting all posts if the API pagination check fails
        try {
          const posts = await fetchAllBlogPosts();
          const calculatedTotalPages = Math.ceil(posts.length / 10);
          
          if (pageNumber <= calculatedTotalPages) {
            return {
              props: {
                type: 'pagination',
                initialPage: pageNumber
              }
            };
          }
        } catch (secondError) {
          console.error('Fallback pagination check also failed:', secondError);
        }
      }
    }
  }
  
  // If we reach here, it's not a valid page or there was an error
  return {
    props: {
      notFound: true
    }
  };
}