import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Head from 'next/head';

export default function NotFound() {
  // SEO metadata for 404 page
  const seoTitle = 'Page Not Found | GrowthOG';
  const seoDescription = 'The page you are looking for cannot be found. Return to the GrowthOG homepage for link building and SEO services.';
  
  return (
    <Layout
      seo={{
        title: seoTitle,
        description: seoDescription,
        noindex: true, // Tell search engines not to index this page
        canonical: 'https://growthog.com/404',
      }}
    >
      {/* Additional SEO headers */}
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-secondary-900 tracking-tight">
            Page not found
          </h2>
          <p className="mt-6 text-base text-secondary-600">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/" variant="primary">
              Go back home
            </Button>
            <Button href="/blog" variant="outline">
              Check our blog
            </Button>
          </div>
          <div className="mt-12">
            <p className="text-sm text-secondary-500">
              Need assistance? <Link href="/contact" className="text-primary-600 font-medium hover:text-primary-700">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
