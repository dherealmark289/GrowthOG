import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, seo = {} }) => {
  // Default SEO values
  const defaultSEO = {
    title: 'GrowthOG - Links That Drive SaaS Growth',
    description: 'We don\'t just build links. We create authority that fuels organic growth for B2B SaaS brands.',
    canonical: 'https://www.growthog.com',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.growthog.com',
      site_name: 'GrowthOG',
      images: [
        {
          url: 'https://www.growthog.com/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'GrowthOG',
        },
      ],
    },
    twitter: {
      handle: '@growthog',
      site: '@growthog',
      cardType: 'summary_large_image',
    },
    noindex: false, // Default is to allow indexing
  };

  // Merge default with page-specific SEO values
  const mergedSEO = { ...defaultSEO, ...seo };

  return (
    <>
      <Head>
        <title>{mergedSEO.title}</title>
        <meta name="description" content={mergedSEO.description} />
        <link rel="canonical" href={mergedSEO.canonical} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Control indexing */}
        {mergedSEO.noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        )}
        
        {/* Language tag for accessibility and SEO */}
        <meta property="og:locale" content={mergedSEO.openGraph?.locale || defaultSEO.openGraph.locale} />
        
        {/* Open Graph */}
        <meta property="og:type" content={mergedSEO.openGraph?.type || defaultSEO.openGraph.type} />
        <meta property="og:url" content={mergedSEO.openGraph?.url || defaultSEO.openGraph.url} />
        <meta property="og:title" content={mergedSEO.title} />
        <meta property="og:description" content={mergedSEO.description} />
        <meta property="og:image" content={mergedSEO.openGraph?.images?.[0]?.url || defaultSEO.openGraph.images[0].url} />
        <meta property="og:site_name" content={mergedSEO.openGraph?.site_name || defaultSEO.openGraph.site_name} />
        
        {/* Image dimensions for better Open Graph display */}
        {mergedSEO.openGraph?.images?.[0]?.width && (
          <meta property="og:image:width" content={mergedSEO.openGraph.images[0].width.toString()} />
        )}
        {mergedSEO.openGraph?.images?.[0]?.height && (
          <meta property="og:image:height" content={mergedSEO.openGraph.images[0].height.toString()} />
        )}

        {/* Twitter */}
        <meta name="twitter:card" content={mergedSEO.twitter?.cardType || defaultSEO.twitter.cardType} />
        <meta name="twitter:site" content={mergedSEO.twitter?.site || defaultSEO.twitter.site} />
        <meta name="twitter:title" content={mergedSEO.title} />
        <meta name="twitter:description" content={mergedSEO.description} />
        <meta name="twitter:image" content={mergedSEO.openGraph?.images?.[0]?.url || defaultSEO.openGraph.images[0].url} />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/case-studies/logo-1.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/case-studies/logo-1.png" />
        <link rel="shortcut icon" href="/images/case-studies/logo-1.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/case-studies/logo-1.png" />
        
        {/* Preconnect to headless WordPress domain for faster loading */}
        <link rel="preconnect" href="https://headlesswp.growthog.com" />
        <link rel="dns-prefetch" href="https://headlesswp.growthog.com" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-2">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;