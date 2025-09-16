/**
 * WordPress API service for fetching content from headless WordPress
 * Includes caching for improved performance and webhook support for cache invalidation
 */

// Initialize global cache variables if they don't exist
if (typeof global.wpSitemapCache === 'undefined') {
  global.wpSitemapCache = new Map();
  global.wpSitemapCacheTime = new Map();
  console.log('Initialized global WordPress sitemap cache');
}

/**
 * Helper function to extract images from post content
 * @param {Object} post - WordPress post object with _embedded data
 * @returns {Array<{url: string, title: string}>} - Array of image objects
 */
export function extractPostImages(post) {
  const images = [];
  
  try {
    // 1. Add featured image if available
    if (post._embedded && post._embedded['wp:featuredmedia']) {
      post._embedded['wp:featuredmedia'].forEach(media => {
        if (media.source_url) {
          images.push({
            url: media.source_url,
            title: media.title?.rendered || media.alt_text || 'Featured image'
          });
        }
      });
    }
    
    // 2. Extract images from content if available
    if (post.content && post.content.rendered) {
      const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
      const titleRegex = /alt="([^">]*)"/;
      let match;
      
      while ((match = imgRegex.exec(post.content.rendered)) !== null) {
        const imgSrc = match[1];
        let imgTitle = 'Image';
        
        // Try to get alt text for the title
        const titleMatch = titleRegex.exec(match[0]);
        if (titleMatch && titleMatch[1]) {
          imgTitle = titleMatch[1];
        }
        
        // Don't add duplicate images (e.g., if featured image appears in content)
        if (!images.some(img => img.url === imgSrc)) {
          images.push({
            url: imgSrc,
            title: imgTitle
          });
        }
      }
    }
    
    return images;
  } catch (error) {
    console.error('Error extracting images from post:', error);
    return [];
  }
}

const API_URL = 'https://headlesswp.growthog.com/wp-json/wp/v2';
const WP_SITEMAP_INDEX_URL = 'https://headlesswp.growthog.com/sitemap_index.xml';
const WP_POST_SITEMAP_URL = 'https://headlesswp.growthog.com/post-sitemap.xml';
const WP_PAGE_SITEMAP_URL = 'https://headlesswp.growthog.com/page-sitemap.xml';
const BLOG_CATEGORY = 'link-building-blog';
const BLOG_BASE_URL = 'https://headlesswp.growthog.com/link-building-blog';

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // Cache TTL: 5 minutes in milliseconds
const postCache = new Map(); // Cache for individual posts by slug
const pageCache = new Map(); // Cache for paginated results
const allPostsCache = { data: null, timestamp: 0 }; // Cache for all posts
const sitemapCache = { data: null, timestamp: 0 }; // Cache for sitemap data

/**
 * Check if cached data is still valid
 * @param {number} timestamp - When the data was cached
 * @returns {boolean} - Whether the cache is still valid
 */
function isCacheValid(timestamp) {
  return (Date.now() - timestamp) < CACHE_TTL;
}

/**
 * Fetch specific posts by their URLs or paths
 * @param {Array<string>} urls - Array of post URLs or paths
 * @returns {Promise<Array>} - Array of posts
 */
export async function fetchSpecificPosts(urls) {
  try {
    // Extract slugs from URLs
    const slugs = urls.map(url => {
      // Extract the slug from the URL pattern
      const parts = url.split('/');
      // Get the last non-empty part (the slug)
      return parts.filter(part => part.length > 0).pop();
    });
    
    // Fetch each post by slug
    const postPromises = slugs.map(slug => fetchPostBySlug(slug));
    const posts = await Promise.all(postPromises);
    
    // Filter out any null results and format posts
    return formatWordPressPosts(posts.filter(post => post !== null));
  } catch (error) {
    console.error('Error fetching specific posts:', error);
    return [];
  }
}

/**
 * Fetch all blog posts from the WordPress API
 * @param {number} page - Page number
 * @param {number} perPage - Posts per page
 * @param {Object} filters - Optional filters to apply to the query
 * @param {string} filters.topic - Topic filter
 * @param {string} filters.contentType - Content type filter
 * @param {string} filters.date - Date filter
 * @param {string} filters.search - Search query
 * @returns {Promise<{posts: Array, totalPages: number, totalPosts: number}>}
 */
export async function fetchBlogPosts(page = 1, perPage = 10, filters = {}) {
  try {
    // Generate unique cache key for this page request including filters
    const filtersKey = Object.entries(filters)
      .filter(([_, value]) => value && value !== '')
      .map(([key, value]) => `${key}_${value}`)
      .join('_');
    
    const cacheKey = `page_${page}_perPage_${perPage}${filtersKey ? '_' + filtersKey : ''}`;
    
    // Check if we have a valid cached response
    if (pageCache.has(cacheKey)) {
      const cachedData = pageCache.get(cacheKey);
      if (isCacheValid(cachedData.timestamp)) {
        console.log(`Using cached data for page ${page} with filters (cache age: ${(Date.now() - cachedData.timestamp)/1000}s)`);
        return cachedData.data;
      } else {
        console.log(`Cache expired for page ${page} with filters, fetching fresh data`);
      }
    } else {
      console.log(`No cache found for page ${page} with filters, fetching from WordPress API`);
    }
    
    console.log(`Fetching blog posts for page ${page} with ${perPage} posts per page and filters:`, filters);
    
    // First try to fetch posts from the specific category slug
    const categoryResponse = await fetch(`${API_URL}/categories?slug=${BLOG_CATEGORY}`);
    const categories = await categoryResponse.json();
    
    let endpoint = `${API_URL}/posts?_embed=true`;
    
    // If using filters, we need to get ALL posts by removing pagination initially
    const hasActiveFilters = Object.values(filters).some(value => value && value !== '' && 
      !(value === 'All Topics' || value === 'Content Type' || value === 'Date'));
    
    if (!hasActiveFilters) {
      // Only use pagination if no filters are active
      endpoint += `&page=${page}&per_page=${perPage}`;
    } else {
      // When filters are active, get a higher number of posts (100) to ensure we capture most relevant ones
      endpoint += `&per_page=100`;
    }
    
    // If we found the category, use its ID to filter posts
    if (categories && categories.length > 0) {
      endpoint += `&categories=${categories[0].id}`;
    }
    
    // Add filters to the endpoint
    if (filters.search) {
      endpoint += `&search=${encodeURIComponent(filters.search)}`;
    }
    
    // Filter by topic (using tag)
    if (filters.topic && filters.topic !== 'All Topics') {
      // First get the tag ID for the topic
      const tagResponse = await fetch(`${API_URL}/tags?search=${encodeURIComponent(filters.topic)}`);
      const tags = await tagResponse.json();
      
      if (tags && tags.length > 0) {
        endpoint += `&tags=${tags[0].id}`;
      }
    }
    
    // Add date filtering
    if (filters.date) {
      switch (filters.date) {
        case 'Last 7 days':
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          endpoint += `&after=${sevenDaysAgo.toISOString()}`;
          break;
        case 'Last 30 days':
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          endpoint += `&after=${thirtyDaysAgo.toISOString()}`;
          break;
        case 'Last 3 months':
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          endpoint += `&after=${threeMonthsAgo.toISOString()}`;
          break;
        case 'Last year':
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          endpoint += `&after=${oneYearAgo.toISOString()}`;
          break;
        case 'Newest First':
          endpoint += `&order=desc&orderby=date`;
          break;
        case 'Oldest First':
          endpoint += `&order=asc&orderby=date`;
          break;
      }
    }
    
    console.log(`Fetching from WordPress endpoint: ${endpoint}`);
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    let posts = await response.json();
    let totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    let totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    
    // If we have active filters and fetched all posts at once, we need to handle pagination manually
    if (hasActiveFilters) {
      totalPosts = posts.length;
      totalPages = Math.ceil(totalPosts / perPage);
      
      // Calculate the correct slice of posts for the requested page
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      posts = posts.slice(startIndex, endIndex);
    }
    
    console.log(`WordPress API returned ${posts.length} posts, total: ${totalPosts}, pages: ${totalPages}`);
    
    // Create result object
    const result = {
      posts,
      totalPages,
      totalPosts
    };
    
    // Store in cache with current timestamp
    pageCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });
    
    return result;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return {
      posts: [],
      totalPages: 1,
      totalPosts: 0
    };
  }
}

/**
 * Fetch ALL blog posts from WordPress (across all pages)
 * @returns {Promise<Array>} - Complete array of all posts
 */
export async function fetchAllBlogPosts() {
  try {
    // Check cache first
    if (allPostsCache.data && isCacheValid(allPostsCache.timestamp)) {
      console.log(`Using cached data for all posts (cache age: ${(Date.now() - allPostsCache.timestamp)/1000}s)`);
      return allPostsCache.data;
    }
    
    console.log('Fetching all blog posts from WordPress API (cache miss or expired)');
    
    // First get the first page to determine how many pages total
    const firstPageResult = await fetchBlogPosts(1, 100); // Get up to 100 per page to minimize requests
    
    // If there's only one page or no posts, return immediately
    if (firstPageResult.totalPages <= 1 || firstPageResult.totalPosts === 0) {
      const formattedPosts = formatWordPressPosts(firstPageResult.posts);
      
      // Cache the results
      allPostsCache.data = formattedPosts;
      allPostsCache.timestamp = Date.now();
      
      return formattedPosts;
    }
    
    // Create an array of promises for all pages
    const pagePromises = [];
    pagePromises.push(Promise.resolve(firstPageResult.posts)); // Add first page results
    
    // Fetch remaining pages (2 to totalPages)
    for (let page = 2; page <= firstPageResult.totalPages; page++) {
      pagePromises.push(
        fetchBlogPosts(page, 100).then(result => result.posts)
      );
    }
    
    // Wait for all pages to be fetched
    const pagesResults = await Promise.all(pagePromises);
    
    // Flatten the array of arrays into a single array of posts
    const allPosts = pagesResults.flat();
    
    // Format the posts
    const formattedPosts = formatWordPressPosts(allPosts);
    
    // Cache the results
    allPostsCache.data = formattedPosts;
    allPostsCache.timestamp = Date.now();
    
    // Return the formatted posts
    return formattedPosts;
  } catch (error) {
    console.error('Error fetching all WordPress posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>}
 */
export async function fetchPostBySlug(slug) {
  try {
    // Check if we have a valid cached post
    if (postCache.has(slug)) {
      const cachedData = postCache.get(slug);
      if (isCacheValid(cachedData.timestamp)) {
        console.log(`Using cached post data for slug "${slug}" (cache age: ${(Date.now() - cachedData.timestamp)/1000}s)`);
        return cachedData.data;
      } else {
        console.log(`Cache expired for post "${slug}", fetching fresh data`);
      }
    } else {
      console.log(`No cache found for post "${slug}", fetching from WordPress API`);
    }
    
    // Fetch from WordPress API
    const response = await fetch(`${API_URL}/posts?_embed=true&slug=${slug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    const posts = await response.json();
    const post = posts && posts.length > 0 ? posts[0] : null;
    
    // Cache the post result
    if (post) {
      postCache.set(slug, {
        data: post,
        timestamp: Date.now()
      });
    }
    
    // Return the first post that matches the slug
    return post;
  } catch (error) {
    console.error(`Error fetching WordPress post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Helper function to extract clean content from WordPress post
 * @param {Object} post - WordPress post object
 * @returns {Object} - Clean post object
 */
export function formatWordPressPost(post) {
  if (!post) return null;
  
  const featured_image = 
    post._embedded && 
    post._embedded['wp:featuredmedia'] && 
    post._embedded['wp:featuredmedia'][0] ? 
    post._embedded['wp:featuredmedia'][0].source_url : 
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'; // Default image
  
  const author = 
    post._embedded && 
    post._embedded.author && 
    post._embedded.author[0] ? 
    post._embedded.author[0].name : 'GrowthOG Team';
    
  // Extract the original path and slug from WordPress
  let path = '';
  let wpSlug = post.slug || '';
  
  if (post.link) {
    try {
      // Extract the full original URL path
      const url = new URL(post.link);
      path = url.pathname;
      
      // Remove trailing slash if present
      if (path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      
      // Extract the true slug from the URL path
      // This ensures we get the exact slug format used by WordPress
      const pathSegments = path.split('/').filter(segment => segment.length > 0);
      
      // The last segment should be the actual slug used in WordPress URLs
      if (pathSegments.length > 0) {
        wpSlug = pathSegments[pathSegments.length - 1];
      }
    } catch (error) {
      console.error('Error parsing post link:', error);
    }
  }
  
  // Create a safe structure for the post
  return {
    id: post.id || Math.random().toString(36).substr(2, 9),
    title: post.title ? post.title.rendered || 'Untitled Post' : 'Untitled Post',
    content: post.content ? post.content.rendered || '' : '',
    excerpt: post.excerpt ? post.excerpt.rendered || '' : '',
    slug: post.slug || 'untitled-post',
    wpSlug: wpSlug, // The exact slug used in the WordPress URL
    date: post.date ? post.date : new Date().toISOString(),
    modified: post.modified ? post.modified : new Date().toISOString(),
    featured_image: featured_image,
    author: author,
    // Add both the original URL and the WordPress blog path
    originalUrl: post.link || '',
    path: path // Store the full path from WordPress
  };
}

/**
 * Format multiple WordPress posts
 * @param {Array} posts - Array of WordPress posts
 * @returns {Array} - Array of formatted posts
 */
export function formatWordPressPosts(posts) {
  if (!posts || !Array.isArray(posts)) return [];
  return posts.map(post => formatWordPressPost(post));
}

/**
 * Parse a sitemap XML string into URL entries
 * @param {string} xmlText - The XML string to parse
 * @returns {Array} - Array of URL entries with slugs and lastmod dates
 */
function parseSitemapXml(xmlText) {
  const urlEntries = [];
  const urlRegex = /<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g;
  
  // Extract all URL entries
  let match;
  while ((match = urlRegex.exec(xmlText)) !== null) {
    const fullUrl = match[1]; // The complete URL
    const lastMod = match[2]; // The lastmod date
    
    // Parse the URL to extract the slug
    try {
      const url = new URL(fullUrl);
      let path = url.pathname;
      
      // Remove trailing slash if present
      if (path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      
      // Extract the slug from the path
      const segments = path.split('/').filter(s => s.length > 0);
      const slug = segments[segments.length - 1];
      const type = segments.includes('link-building-blog') ? 'post' : 'page';
      
      urlEntries.push({
        url: fullUrl,
        path: path,
        slug: slug,
        lastModified: lastMod,
        type: type
      });
    } catch (urlError) {
      console.error('Error parsing URL from sitemap:', urlError);
    }
  }
  
  return urlEntries;
}

/**
 * Fetch all blog posts from WordPress sitemap XML
 * This is more reliable than the API pagination for large sites
 * @returns {Promise<Array>} - Array of simplified post objects with slugs and lastmod dates
 */
export async function fetchPostsFromSitemap() {
  try {
    const CACHE_KEY = 'post-sitemap';
    
    // Check if we have valid cached sitemap data in global cache
    if (global.wpSitemapCache.has(CACHE_KEY) && 
        isCacheValid(global.wpSitemapCacheTime.get(CACHE_KEY))) {
      const cacheAge = (Date.now() - global.wpSitemapCacheTime.get(CACHE_KEY)) / 1000;
      console.log(`Using cached post sitemap data (cache age: ${cacheAge.toFixed(1)}s)`);
      return global.wpSitemapCache.get(CACHE_KEY);
    }
    
    // Fallback to local cache if global cache is missing
    if (sitemapCache.data && isCacheValid(sitemapCache.timestamp)) {
      console.log(`Using locally cached sitemap data (cache age: ${(Date.now() - sitemapCache.timestamp)/1000}s)`);
      return sitemapCache.data;
    }
    
    console.log('Fetching and parsing WordPress post sitemap (cache miss or expired)');
    
    const response = await fetch(WP_POST_SITEMAP_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch WordPress post sitemap: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const urlEntries = parseSitemapXml(xmlText);
    
    console.log(`Successfully parsed ${urlEntries.length} URLs from WordPress post sitemap`);
    
    // Check for any missing posts that might not be in the sitemap
    // These are posts that exist in WordPress but might not be in the sitemap
    const missingPosts = [
      {
        url: 'https://headlesswp.growthog.com/saas-link-building/',
        path: '/saas-link-building',
        slug: 'saas-link-building',
        lastModified: '2025-03-05T08:43:00+00:00',
        type: 'post',
        imageCount: 3
      },
      {
        url: 'https://headlesswp.growthog.com/link-building-strategies/',
        path: '/link-building-strategies',
        slug: 'link-building-strategies',
        lastModified: '2025-03-05T08:40:00+00:00',
        type: 'post',
        imageCount: 10
      },
      {
        url: 'https://headlesswp.growthog.com/link-exchange/',
        path: '/link-exchange',
        slug: 'link-exchange',
        lastModified: '2025-03-05T08:40:00+00:00',
        type: 'post',
        imageCount: 6
      },
      {
        url: 'https://headlesswp.growthog.com/relevant-backlinks/',
        path: '/relevant-backlinks',
        slug: 'relevant-backlinks',
        lastModified: '2025-03-05T08:39:00+00:00',
        type: 'post',
        imageCount: 8
      },
      {
        url: 'https://headlesswp.growthog.com/link-building-outreach/',
        path: '/link-building-outreach',
        slug: 'link-building-outreach',
        lastModified: '2025-03-05T08:38:00+00:00',
        type: 'post',
        imageCount: 9
      },
      {
        url: 'https://headlesswp.growthog.com/sponsored-links/',
        path: '/sponsored-links',
        slug: 'sponsored-links',
        lastModified: '2025-02-13T13:06:00+00:00',
        type: 'post',
        imageCount: 1
      },
      {
        url: 'https://headlesswp.growthog.com/seed-keywords/',
        path: '/seed-keywords',
        slug: 'seed-keywords',
        lastModified: '2025-01-22T04:15:00+00:00',
        type: 'post',
        imageCount: 1
      },
      {
        url: 'https://headlesswp.growthog.com/reciprocal-links/',
        path: '/reciprocal-links',
        slug: 'reciprocal-links',
        lastModified: '2025-01-17T06:38:00+00:00',
        type: 'post',
        imageCount: 1
      },
      {
        url: 'https://headlesswp.growthog.com/link-farming/',
        path: '/link-farming',
        slug: 'link-farming',
        lastModified: '2025-01-11T04:28:00+00:00',
        type: 'post',
        imageCount: 2
      },
      {
        url: 'https://headlesswp.growthog.com/brand-reputation/',
        path: '/brand-reputation',
        slug: 'brand-reputation',
        lastModified: '2024-12-08T04:30:00+00:00',
        type: 'post',
        imageCount: 20
      },
      {
        url: 'https://headlesswp.growthog.com/relationship-based-link-building/',
        path: '/relationship-based-link-building',
        slug: 'relationship-based-link-building',
        lastModified: '2024-12-08T04:23:00+00:00',
        type: 'post',
        imageCount: 2
      },
      {
        url: 'https://headlesswp.growthog.com/hire-link-builder/',
        path: '/hire-link-builder',
        slug: 'hire-link-builder',
        lastModified: '2024-12-08T04:22:00+00:00',
        type: 'post',
        imageCount: 3
      },
      {
        url: 'https://headlesswp.growthog.com/value-of-backlinks/',
        path: '/value-of-backlinks',
        slug: 'value-of-backlinks',
        lastModified: '2024-12-08T04:22:00+00:00',
        type: 'post',
        imageCount: 1
      },
      {
        url: 'https://headlesswp.growthog.com/local-link-building/',
        path: '/local-link-building',
        slug: 'local-link-building',
        lastModified: '2024-12-08T04:22:00+00:00',
        type: 'post',
        imageCount: 4
      }
    ];
    
    // Merge existing URLs with missing ones, but avoid duplicates
    const existingSlugs = urlEntries.map(entry => entry.slug);
    const missingPostsToAdd = missingPosts.filter(post => !existingSlugs.includes(post.slug));
    
    if (missingPostsToAdd.length > 0) {
      console.log(`Adding ${missingPostsToAdd.length} missing posts to sitemap`);
      const mergedEntries = [...urlEntries, ...missingPostsToAdd];
      
      // Cache the merged sitemap data (both global and local)
      global.wpSitemapCache.set(CACHE_KEY, mergedEntries);
      global.wpSitemapCacheTime.set(CACHE_KEY, Date.now());
      sitemapCache.data = mergedEntries;
      sitemapCache.timestamp = Date.now();
      
      return mergedEntries;
    }
    
    // Cache the original sitemap data if no missing posts were added
    global.wpSitemapCache.set(CACHE_KEY, urlEntries);
    global.wpSitemapCacheTime.set(CACHE_KEY, Date.now());
    sitemapCache.data = urlEntries;
    sitemapCache.timestamp = Date.now();
    
    return urlEntries;
  } catch (error) {
    console.error('Error fetching posts from WordPress sitemap:', error);
    return [];
  }
}

/**
 * Fetch all pages from WordPress sitemap XML
 * @returns {Promise<Array>} - Array of simplified page objects with slugs and lastmod dates
 */
export async function fetchPagesFromSitemap() {
  try {
    const CACHE_KEY = 'page-sitemap';

    // Check if we have valid cached page sitemap data in global cache
    if (global.wpSitemapCache.has(CACHE_KEY) && 
        isCacheValid(global.wpSitemapCacheTime.get(CACHE_KEY))) {
      const cacheAge = (Date.now() - global.wpSitemapCacheTime.get(CACHE_KEY)) / 1000;
      console.log(`Using cached page sitemap data (cache age: ${cacheAge.toFixed(1)}s)`);
      return global.wpSitemapCache.get(CACHE_KEY);
    }
    
    console.log('Fetching and parsing WordPress page sitemap');
    
    const response = await fetch(WP_PAGE_SITEMAP_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch WordPress page sitemap: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const urlEntries = parseSitemapXml(xmlText);
    
    console.log(`Successfully parsed ${urlEntries.length} URLs from WordPress page sitemap`);
    
    // Cache the page sitemap data globally
    global.wpSitemapCache.set(CACHE_KEY, urlEntries);
    global.wpSitemapCacheTime.set(CACHE_KEY, Date.now());
    
    return urlEntries;
  } catch (error) {
    console.error('Error fetching pages from WordPress sitemap:', error);
    return [];
  }
}

/**
 * Fetch all sitemaps from WordPress sitemap index
 * @returns {Promise<Array>} - Array of sitemap URLs
 */
export async function fetchSitemapIndex() {
  try {
    const CACHE_KEY = 'sitemap-index';
    
    // Check if we have valid cached sitemap index data in global cache
    if (global.wpSitemapCache.has(CACHE_KEY) && 
        isCacheValid(global.wpSitemapCacheTime.get(CACHE_KEY))) {
      const cacheAge = (Date.now() - global.wpSitemapCacheTime.get(CACHE_KEY)) / 1000;
      console.log(`Using cached sitemap index (cache age: ${cacheAge.toFixed(1)}s)`);
      return global.wpSitemapCache.get(CACHE_KEY);
    }
    
    console.log('Fetching WordPress sitemap index');
    
    const response = await fetch(WP_SITEMAP_INDEX_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch WordPress sitemap index: ${response.status}`);
    }
    
    const xmlText = await response.text();
    
    // Parse the sitemap index to find all sitemaps
    const sitemaps = [];
    const sitemapRegex = /<sitemap>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/sitemap>/g;
    
    let match;
    while ((match = sitemapRegex.exec(xmlText)) !== null) {
      const sitemapUrl = match[1];
      const lastMod = match[2];
      
      sitemaps.push({
        url: sitemapUrl,
        lastModified: lastMod
      });
    }
    
    console.log(`Found ${sitemaps.length} sitemaps in WordPress sitemap index`);
    
    // Cache the sitemap index data
    global.wpSitemapCache.set(CACHE_KEY, sitemaps);
    global.wpSitemapCacheTime.set(CACHE_KEY, Date.now());
    
    return sitemaps;
  } catch (error) {
    console.error('Error fetching WordPress sitemap index:', error);
    return [];
  }
}

/**
 * Fetch all content (posts and pages) from WordPress sitemaps
 * @returns {Promise<{posts: Array, pages: Array}>} - Object containing posts and pages
 */
export async function fetchAllContentFromSitemaps() {
  try {
    // First check if we can get the sitemap index
    const sitemapIndex = await fetchSitemapIndex();
    let posts = [];
    let pages = [];
    
    if (sitemapIndex.length > 0) {
      // Find post and page sitemaps in the index
      const postSitemap = sitemapIndex.find(sitemap => sitemap.url.includes('post-sitemap.xml'));
      const pageSitemap = sitemapIndex.find(sitemap => sitemap.url.includes('page-sitemap.xml'));
      
      // Fetch posts and pages in parallel if found
      const fetchPromises = [];
      
      if (postSitemap) {
        fetchPromises.push(fetchPostsFromSitemap().then(result => { posts = result; }));
      }
      
      if (pageSitemap) {
        fetchPromises.push(fetchPagesFromSitemap().then(result => { pages = result; }));
      }
      
      // Wait for all fetches to complete
      if (fetchPromises.length > 0) {
        await Promise.all(fetchPromises);
      }
      
      console.log(`Fetched ${posts.length} posts and ${pages.length} pages from WordPress sitemaps`);
    } else {
      // Fallback to direct sitemap URLs if index not available
      posts = await fetchPostsFromSitemap();
      pages = await fetchPagesFromSitemap();
    }
    
    return { posts, pages };
  } catch (error) {
    console.error('Error fetching content from WordPress sitemaps:', error);
    return { posts: [], pages: [] };
  }
}