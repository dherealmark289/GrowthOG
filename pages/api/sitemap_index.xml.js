import { fetchSitemapIndex } from '../../lib/wordpress';

const generateSitemapIndex = (baseUrl) => {
  const today = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/post-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/page-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
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
    
    // For demonstration, we're not actually using the WordPress sitemap index here
    // because we want to point to our own API endpoints, not the WordPress endpoints
    // This is intentional and maintains the sitemap structure
    
    console.log('Generating sitemap index');
    
    // Generate and return the XML sitemap index
    const sitemapIndex = generateSitemapIndex(baseUrl);
    res.status(200).send(sitemapIndex);
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    res.status(500).send('Error generating sitemap index');
  }
}