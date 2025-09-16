import { fetchPagesFromSitemap } from '../../lib/wordpress';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

// Helper to dynamically count images in HTML pages
const countImagesInPages = async () => {
  try {
    // Store the results
    const imagesPerPage = new Map();
    
    // Check directories where our pages are defined
    const pagesDir = path.join(process.cwd(), 'pages');
    const componentsDir = path.join(process.cwd(), 'components');
    
    // Function to get image elements from a file
    const extractImagesFromFile = (filePath) => {
      try {
        if (!fs.existsSync(filePath)) return [];
        
        const content = fs.readFileSync(filePath, 'utf-8');
        const images = [];
        
        // Match all image references:
        // 1. <Image> components
        const imageComponentMatches = content.match(/<Image\s+[^>]*src\s*=\s*['"]([^'"]+)['"]/g) || [];
        imageComponentMatches.forEach(match => {
          const srcMatch = match.match(/src\s*=\s*['"]([^'"]+)['"]/);
          const altMatch = match.match(/alt\s*=\s*['"]([^'"]+)['"]/);
          if (srcMatch && srcMatch[1]) {
            images.push({
              url: srcMatch[1],
              title: altMatch ? altMatch[1] : 'Image'
            });
          }
        });
        
        // 2. <img> tags
        const imgTagMatches = content.match(/<img\s+[^>]*src\s*=\s*['"]([^'"]+)['"]/g) || [];
        imgTagMatches.forEach(match => {
          const srcMatch = match.match(/src\s*=\s*['"]([^'"]+)['"]/);
          const altMatch = match.match(/alt\s*=\s*['"]([^'"]+)['"]/);
          if (srcMatch && srcMatch[1]) {
            images.push({
              url: srcMatch[1],
              title: altMatch ? altMatch[1] : 'Image'
            });
          }
        });
        
        // 3. CSS background images
        const cssImageMatches = content.match(/background-image\s*:\s*url\(['"]([^'"]+)['"]\)/g) || [];
        cssImageMatches.forEach(match => {
          const urlMatch = match.match(/url\(['"]([^'"]+)['"]\)/);
          if (urlMatch && urlMatch[1]) {
            images.push({
              url: urlMatch[1],
              title: 'Background Image'
            });
          }
        });
        
        // 4. Import statements for images (e.g., import logo from '../images/logo.png')
        const importMatches = content.match(/import\s+\w+\s+from\s+['"]([^'"]+\.(png|jpg|jpeg|gif|svg|webp))['"]/g) || [];
        importMatches.forEach(match => {
          const pathMatch = match.match(/from\s+['"]([^'"]+)['"]/);
          if (pathMatch && pathMatch[1]) {
            const importName = match.match(/import\s+(\w+)/) || [];
            images.push({
              url: pathMatch[1],
              title: importName[1] || 'Imported Image'
            });
          }
        });
        
        return images;
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
        return [];
      }
    };
    
    // Add count for homepage
    const indexPage = path.join(pagesDir, 'index.js');
    const homeImages = extractImagesFromFile(indexPage);
    imagesPerPage.set('', homeImages);
    
    // Add count for other pages
    const pageFiles = fs.readdirSync(pagesDir).filter(file => 
      file.endsWith('.js') && file !== '_app.js' && file !== '_document.js'
    );
    
    pageFiles.forEach(file => {
      const pagePath = path.join(pagesDir, file);
      const pageName = file.replace('.js', '');
      const images = extractImagesFromFile(pagePath);
      
      // If this is a dynamic route like [slug].js, skip it in this simple counting
      if (!pageName.includes('[')) {
        imagesPerPage.set(pageName, images);
      }
    });
    
    // Recursively scan public directory for actual image files
    const scanPublicImages = () => {
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) return new Map();
      
      const staticImagesMap = new Map();
      
      // Function to recursively walk the directory
      const walkDirectory = (dir, basePath, resultMap) => {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            // Recursively scan subdirectories
            walkDirectory(filePath, path.join(basePath, file), resultMap);
          } else {
            // Check if file is an image
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
              // Get relative path from public directory
              const relativePath = path.join(basePath, file);
              
              // Add to our result map based on directory structure
              // We'll map by the directory structure (e.g., about-us) to the images
              let pagePath = basePath.split(path.sep)[0] || 'home';
              
              // Map some common directory names to page slugs
              if (pagePath === 'home') pagePath = '';
              if (pagePath === 'about') pagePath = 'about-us';
              
              if (!resultMap.has(pagePath)) {
                resultMap.set(pagePath, []);
              }
              
              resultMap.get(pagePath).push({
                url: `/${relativePath.replace(/\\/g, '/')}`, // Convert to URL format
                title: file.replace(ext, '')
              });
            }
          }
        });
      };
      
      // Start scanning from the public directory
      walkDirectory(publicDir, '', staticImagesMap);
      return staticImagesMap;
    };
    
    // Get actual images from public directory
    const publicImagesMap = scanPublicImages();
    
    // Merge results from code analysis with actual files
    for (const [pageName, publicImages] of publicImagesMap.entries()) {
      if (imagesPerPage.has(pageName)) {
        // Combine code-detected images with public directory images
        imagesPerPage.set(pageName, [
          ...imagesPerPage.get(pageName),
          ...publicImages
        ]);
      } else {
        // Just use public directory images if we don't have code analysis
        imagesPerPage.set(pageName, publicImages);
      }
    }
    
    console.log(`Dynamic image detection found images for ${imagesPerPage.size} pages`);
    return imagesPerPage;
  } catch (error) {
    console.error('Error counting images in pages:', error);
    return new Map();
  }
};

// Create page definitions with proper image counts
const getPageDefinitions = async () => {
  // Base page definitions with default values
  const pageDefinitions = [
    { 
      slug: '', 
      path: '/',
      priority: '1.0',
      changefreq: 'weekly'
    },
    { 
      slug: 'about-us', 
      path: '/about-us/',
      priority: '0.8',
      changefreq: 'monthly'
    },
    { 
      slug: 'book-a-call', 
      path: '/book-a-call/',
      priority: '0.8',
      changefreq: 'monthly'
    },
    { 
      slug: 'services', 
      path: '/services/',
      priority: '0.8',
      changefreq: 'monthly'
    },
    { 
      slug: 'case-studies', 
      path: '/case-studies/',
      priority: '0.8',
      changefreq: 'monthly'
    },
    { 
      slug: 'pricing', 
      path: '/pricing/',
      priority: '0.8',
      changefreq: 'monthly'
    },
    { 
      slug: 'link-building-blog', 
      path: '/link-building-blog/',
      priority: '0.9',
      changefreq: 'daily'
    },
    { 
      slug: 'resources', 
      path: '/resources/',
      priority: '0.8',
      changefreq: 'monthly'
    },
    { 
      slug: 'dashboard', 
      path: '/dashboard/',
      priority: '0.5',
      changefreq: 'daily'
    },
    { 
      slug: 'login', 
      path: '/login/',
      priority: '0.6',
      changefreq: 'monthly'
    },
    { 
      slug: 'register', 
      path: '/register/',
      priority: '0.6',
      changefreq: 'monthly'
    },
    { 
      slug: 'auth', 
      path: '/auth/',
      priority: '0.6',
      changefreq: 'monthly'
    },
    { 
      slug: 'feedback', 
      path: '/feedback/',
      priority: '0.7',
      changefreq: 'monthly'
    }
  ];
  
  // Get dynamically detected image counts
  const pageImagesMap = await countImagesInPages();
  
  // Apply dynamic image counts to page definitions
  return pageDefinitions.map(page => {
    const images = pageImagesMap.get(page.slug) || [];
    return {
      ...page,
      lastModified: new Date().toISOString(),
      images: images,
      imageCount: images.length
    };
  });
};

const generatePageSitemap = async (baseUrl, pages) => {
  // Get dynamic page definitions with real image counts
  const staticPages = await getPageDefinitions();
  
  // Log the dynamically detected images
  staticPages.forEach(page => {
    console.log(`Page "${page.slug || 'homepage'}": ${page.imageCount} images detected`);
  });

  // Get all page slugs from WordPress to avoid duplicates
  const wpSlugs = pages.map(page => page.slug);
  
  // Add static pages that aren't already in WordPress
  const allPages = [
    ...pages,
    ...staticPages.filter(page => !wpSlugs.includes(page.slug))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${allPages.map((page) => {
    // Get the page slug - different data structure depending on how we got the data
    const pageSlug = page.slug ? page.slug : (page.wpSlug || '');
    const imageCount = page.imageCount || 0;
    // Set default values if not provided
    const changefreq = page.changefreq || 'monthly';
    const priority = page.priority || '0.7';
    
    // Get actual images for this page
    const pageImages = page.images || [];
    
    return `
  <url>
    <loc>${baseUrl}${pageSlug.startsWith('/') ? pageSlug : `/${pageSlug}`}/</loc>
    <lastmod>${page.lastModified || (page.modified ? new Date(page.modified).toISOString() : new Date().toISOString())}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${pageImages.map(img => `
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
    
    // Fetch pages from the WordPress sitemap XML
    const pages = await fetchPagesFromSitemap();
    console.log(`Page sitemap: Fetched ${pages.length} pages from WordPress sitemap`);
    
    // Generate and return the XML sitemap (now async)
    const sitemap = await generatePageSitemap(baseUrl, pages);
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating page sitemap:', error);
    res.status(500).send('Error generating page sitemap');
  }
}