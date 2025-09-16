export default function handler(req, res) {
  // Set cache control headers
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');
  res.setHeader('Content-Type', 'text/plain');

  // Get the actual base URL from the request
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host || 'localhost:5000';
  const baseUrl = `${protocol}://${host}`; // Use the actual application URL
  
  // Generate robots.txt content with multiple sitemaps
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap_index.xml
Sitemap: ${baseUrl}/post-sitemap.xml
Sitemap: ${baseUrl}/page-sitemap.xml
Sitemap: ${baseUrl}/sitemap.xml
`;

  res.status(200).send(robotsTxt);
}