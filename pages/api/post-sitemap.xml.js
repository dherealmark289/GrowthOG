import { fetchPostsFromSitemap, fetchBlogPosts, extractPostImages } from '../../lib/wordpress';

const generatePostSitemap = async (baseUrl, posts) => {
  // Get full post data for better image detection
  let enrichedPosts = [...posts];
  
  // Get full post data to extract actual images
  try {
    const allWordPressPosts = await fetchBlogPosts(1, 100);
    const wpPostsMap = new Map();
    
    // Create a map for quick lookup
    if (allWordPressPosts && allWordPressPosts.posts) {
      allWordPressPosts.posts.forEach(post => {
        // Use the slug as the key for matching
        wpPostsMap.set(post.slug, post);
      });
      
      console.log(`Loaded ${wpPostsMap.size} WordPress posts for image detection`);
    }
    
    // Enrich our posts with full WordPress data where available
    enrichedPosts = posts.map(post => {
      const slug = post.slug ? post.slug : (post.wpSlug || '');
      const wpPost = wpPostsMap.get(slug);
      
      if (wpPost) {
        return {
          ...post,
          _embedded: wpPost._embedded,
          content: wpPost.content,
          featured_media: wpPost.featured_media,
          // Add detected image count for analytics
          detectedWpImages: true
        };
      }
      return post;
    });
    
    console.log(`Enriched ${enrichedPosts.filter(p => p.detectedWpImages).length} out of ${enrichedPosts.length} posts with WordPress content`);
  } catch (error) {
    console.warn('Could not fetch full WordPress post data for image extraction:', error);
  }
  
  // Function to get images for each post
  const getImages = (post) => {
    // 1. If we have WordPress post data, use the extractPostImages helper
    if (post.detectedWpImages) {
      const images = extractPostImages(post);
      console.log(`Post ${post.slug}: Extracted ${images.length} images from WordPress content`);
      
      // If we found images, return them, otherwise fall through to fallbacks
      if (images.length > 0) {
        return images;
      }
    }
    
    // 2. If we have a specific image count but no actual images, use placeholders
    const images = [];
    if (post.imageCount && post.imageCount > 0) {
      for (let i = 0; i < post.imageCount; i++) {
        images.push({
          url: `${baseUrl}/placeholder-image-${i+1}.jpg`,
          title: `Image ${i+1} in ${post.slug || 'post'}`
        });
      }
      console.log(`Post ${post.slug}: Using ${images.length} placeholder images`);
    }
    
    return images;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${enrichedPosts.map((post) => {
    // Get the post slug - different data structure depending on how we got the data
    const postSlug = post.slug ? post.slug : (post.wpSlug || '');
    const images = getImages(post);
    // Ensure changefreq is valid and based on how often the content is updated
    const changefreq = post.path && post.path.includes('link-building-blog') ? 'daily' : 'monthly';
    // Determine priority based on content type
    const priority = post.path && post.path.includes('link-building-blog') ? '0.9' : '0.7';
    
    return `
  <url>
    <loc>${baseUrl}${postSlug.startsWith('/') ? postSlug : `/${postSlug}`}/</loc>
    <lastmod>${post.lastModified || (post.modified ? new Date(post.modified).toISOString() : new Date().toISOString())}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${images.map(img => `
    <image:image>
      <image:loc>${img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`}</image:loc>
      <image:title>${img.title}</image:title>
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
    
    // Fetch blog posts from the WordPress sitemap XML
    const posts = await fetchPostsFromSitemap();
    console.log(`Post sitemap: Fetched ${posts.length} blog posts from WordPress sitemap`);
    
    // Generate and return the XML sitemap (now async)
    const sitemap = await generatePostSitemap(baseUrl, posts);
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating post sitemap:', error);
    res.status(500).send('Error generating post sitemap');
  }
}