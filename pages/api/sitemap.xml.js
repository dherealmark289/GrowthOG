import { fetchAllContentFromSitemaps, fetchPostsFromSitemap, fetchAllBlogPosts } from '../../lib/wordpress';

const generateSitemap = (baseUrl, pages, posts, paginationPages) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${pages.map((page) => {
    // Define image count for each page based on path
    let imageCount = 0;
    if (page.path === '/') imageCount = 28;
    else if (page.path === '/about-us/') imageCount = 10;
    else if (page.path === '/services/') imageCount = 14;
    else if (page.path === '/pricing/') imageCount = 2;
    else if (page.path === '/link-building-blog/') imageCount = 6;
    else if (page.path === '/case-studies/') imageCount = 3;
    else if (page.path === '/book-a-call/') imageCount = 7;
    
    return `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
    ${Array(imageCount).fill().map((_, i) => `
    <image:image>
      <image:loc>${baseUrl}/placeholder-image-${i+1}.jpg</image:loc>
      <image:title>Image ${i+1} in ${page.path.replace(/\//g, '')}</image:title>
    </image:image>`).join('')}
  </url>`;
  }).join('')}
  
  ${paginationPages.map((page) => {
    return `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('')}
  
  ${posts.map((post) => {
    // Get the post slug - different data structure depending on how we got the data
    const postSlug = post.slug ? post.slug : (post.wpSlug || '');
    // Get image count - if we have it in the post data
    const imageCount = post._embedded && post._embedded['wp:featuredmedia'] ? 
      post._embedded['wp:featuredmedia'].length : 
      Math.floor(Math.random() * 5); // Random number for demo, replace with real data
      
    return `
  <url>
    <loc>${baseUrl}${postSlug.startsWith('/') ? postSlug : `/${postSlug}`}/</loc>
    <lastmod>${post.lastModified || (post.modified ? new Date(post.modified).toISOString() : new Date().toISOString())}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    ${Array(imageCount).fill().map((_, i) => `
    <image:image>
      <image:loc>${baseUrl}/placeholder-image-${i+1}.jpg</image:loc>
      <image:title>Image ${i+1} in ${postSlug}</image:title>
    </image:image>`).join('')}
  </url>`;
  }).join('')}
</urlset>`;
};

export default async function handler(req, res) {
  // Set cache control headers for better performance
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=600');
  res.setHeader('Content-Type', 'text/xml');

  try {
    // Define the base URL for the sitemap
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:5000';
    const baseUrl = `${protocol}://${host}`; // Use the actual application URL
    const today = new Date().toISOString();
    
    // Fetch ALL content (posts and pages) from WordPress sitemaps
    let posts = [];
    try {
      // First try to get all content from WordPress sitemaps
      const { posts: sitemapPosts } = await fetchAllContentFromSitemaps();
      posts = sitemapPosts;
      console.log(`Sitemap: Successfully fetched ${posts.length} total blog posts from WordPress sitemaps`);
      
      // If the sitemap approach fails, fall back to other methods
      if (!posts || posts.length === 0) {
        throw new Error('No posts found in sitemap, trying direct post sitemap');
      }
    } catch (allSitemapsError) {
      console.error('Error fetching from all WordPress sitemaps:', allSitemapsError);
      
      // Try just the post sitemap
      try {
        posts = await fetchPostsFromSitemap();
        console.log(`Sitemap: Successfully fetched ${posts.length} blog posts from post sitemap`);
        
        if (!posts || posts.length === 0) {
          throw new Error('No posts found in post sitemap, falling back to API');
        }
      } catch (postSitemapError) {
        console.error('Error fetching from WordPress post sitemap:', postSitemapError);
        
        // Fall back to the API pagination approach as last resort
        try {
          posts = await fetchAllBlogPosts();
          console.log(`Sitemap: Last resort successful, fetched ${posts.length} total blog posts via API`);
        } catch (wpError) {
          console.error('Error fetching WordPress posts via API:', wpError);
          // Continue with just the static pages
        }
      }
    }

    // Define our static pages
    const staticPages = [
      { path: '/', lastModified: today, changeFrequency: 'weekly', priority: '1.0' },
      { path: '/services/', lastModified: today, changeFrequency: 'monthly', priority: '0.8' },
      { path: '/pricing/', lastModified: today, changeFrequency: 'monthly', priority: '0.8' },
      { path: '/resources/', lastModified: today, changeFrequency: 'weekly', priority: '0.8' },
      { path: '/about-us/', lastModified: today, changeFrequency: 'monthly', priority: '0.7' },
      { path: '/link-building-blog/', lastModified: today, changeFrequency: 'daily', priority: '0.9' },
      { path: '/case-studies/', lastModified: today, changeFrequency: 'monthly', priority: '0.8' },
      { path: '/book-a-call/', lastModified: today, changeFrequency: 'monthly', priority: '0.8' },
      { path: '/case-studies/182-traffic-growth-and-195-increase-in-organic-keywords-in-18-months/', lastModified: today, changeFrequency: 'monthly', priority: '0.7' },
      { path: '/case-studies/the-24-link-strategy-that-drove-48-traffic-growth/', lastModified: today, changeFrequency: 'monthly', priority: '0.7' },
    ];

    // Add pagination pages for blog
    const paginationPages = [];
    if (posts.length > 0) {
      const totalPages = Math.ceil(posts.length / 10);
      console.log(`Sitemap: Generating pagination for ${totalPages} total pages of blog posts`);
      
      // Add pagination pages (starting from page 2, page 1 is already in static pages)
      for (let i = 2; i <= totalPages; i++) {
        paginationPages.push({
          path: `/link-building-blog/${i}/`,
          lastModified: today,
          changeFrequency: 'daily',
          priority: '0.7'
        });
      }
    }
    
    // Generate and return the XML sitemap
    const sitemap = generateSitemap(baseUrl, staticPages, posts, paginationPages);
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}