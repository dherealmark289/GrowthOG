export const defaultMetaTags = {
  title: 'GrowthOG - Data-Driven Growth Marketing Agency',
  description: 'GrowthOG is a growth marketing agency that helps B2B SaaS, ecommerce, and professional service companies grow through data-driven strategies.',
  keywords: 'growth marketing, digital marketing, content marketing, SEO, PPC, email marketing, B2B marketing',
  ogImage: '/images/og-image.jpg',
  ogUrl: 'https://growthog.com',
  twitterHandle: '@growthog',
};

export const getSEOTags = (pageMetaTags) => {
  const tags = { ...defaultMetaTags, ...pageMetaTags };
  
  return {
    title: tags.title,
    meta: [
      { name: 'description', content: tags.description },
      { name: 'keywords', content: tags.keywords },
      
      // Open Graph
      { property: 'og:title', content: tags.title },
      { property: 'og:description', content: tags.description },
      { property: 'og:image', content: tags.ogImage },
      { property: 'og:url', content: tags.ogUrl || defaultMetaTags.ogUrl },
      { property: 'og:type', content: 'website' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: tags.twitterHandle || defaultMetaTags.twitterHandle },
      { name: 'twitter:title', content: tags.title },
      { name: 'twitter:description', content: tags.description },
      { name: 'twitter:image', content: tags.ogImage },
      
      // Additional meta tags
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'canonical', content: tags.canonicalUrl || tags.ogUrl || defaultMetaTags.ogUrl },
    ],
  };
};
