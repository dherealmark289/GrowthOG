/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com', 
      'via.placeholder.com', 
      'tailwindui.com', 
      'headlesswp.growthog.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'headlesswp.growthog.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // Optimization for SEO
  poweredByHeader: false,
  // Enable static generation for better SEO
  trailingSlash: true,
  // Add redirects to match the headless WordPress site URLs
  async redirects() {
    return [
      {
        source: '/about/',
        destination: '/about-us/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us/',
        permanent: true,
      },
      {
        source: '/book-call/',
        destination: '/book-a-call/',
        permanent: true,
      },
      {
        source: '/book-call',
        destination: '/book-a-call/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/link-building-blog/',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/link-building-blog/',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/blog/:slug/',
        destination: '/:slug/',
        permanent: true,
      },
      // We removed this redirect as it was causing a redirect loop
      // Redirect blog posts to the root level (/post-slug/ instead of /link-building-blog/post-slug/)
      // But preserve pagination URLs
      {
        source: '/link-building-blog/:slug([^/]+)',
        destination: '/:slug',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'x-nextjs-data',
            value: '1',
          },
          {
            type: 'query',
            key: 'slug',
            // Only redirect if the slug is not a number (pagination)
            value: '(?!\\d+$).*',
          },
        ],
      },
      {
        source: '/link-building-blog/:slug([^/]+)/',
        destination: '/:slug/',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'x-nextjs-data',
            value: '1',
          },
          {
            type: 'query',
            key: 'slug',
            // Only redirect if the slug is not a number (pagination)
            value: '(?!\\d+$).*',
          },
        ],
      },

    ]
  },
  // Add rewrites for SEO files only
  async rewrites() {
    return [
      // SEO files
      {
        source: '/robots.txt',
        destination: '/api/robots.txt',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
      // WordPress style sitemap structure
      {
        source: '/sitemap_index.xml',
        destination: '/api/sitemap_index.xml',
      },
      {
        source: '/post-sitemap.xml',
        destination: '/api/post-sitemap.xml',
      },
      {
        source: '/page-sitemap.xml',
        destination: '/api/page-sitemap.xml',
      }
    ]
  },
}

module.exports = nextConfig
