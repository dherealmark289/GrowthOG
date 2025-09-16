import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Pagination from '../components/blog/Pagination';

export default function Home() {
  return (
    <Layout
      seo={{
        title: 'GrowthOG - Links That Drive SaaS Growth',
        description: 'We don\'t just build links. We create authority that fuels organic growth for B2B SaaS brands.',
      }}
    >
      {/* Main content container */}
      <div className="max-w-[1280px] mx-auto px-8 min-h-screen flex flex-col">
        {/* Main section with 48px vertical spacing */}
        <div className="my-12">
          <Hero />
        </div>
        
        {/* Pagination at bottom of page that links to other sections */}
        <div className="border-t border-t-[2.5px] border-[#E5E7EB] mt-auto pt-4 pb-6">
          <Pagination totalPages={6} currentPage={1} />
        </div>
      </div>
    </Layout>
  );
}
