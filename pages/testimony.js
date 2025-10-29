import Layout from '../components/layout/Layout';
import Testimonials from '../components/home/Testimonials';

export default function Testimony() {
  return (
    <Layout
      seo={{
        title: 'Testimonials | GrowthOG',
        description: 'See what our clients have to say about working with GrowthOG.',
      }}
    >
      <div className="py-10">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="border-[2.5px] border-black rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-white p-8 md:p-[32px] mb-8">
            <h1 className="text-[36px] font-extrabold text-black leading-[1.2]">Client Testimonials</h1>
            <p className="text-[18px] font-normal text-[#4B5563] leading-[1.4] mt-3">
              Don't just take our word for it. Here's what our clients have to say about working with GrowthOG.
            </p>
          </div>
          
          {/* Video Testimonial */}
          <div className="border-[2.5px] border-black rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-white p-4 sm:p-6 md:p-8 mb-8">
            {/* Mobile: Full width with padding */}
            <div className="block md:hidden">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/H1kKyo6qcpY"
                  title="Client Testimonial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-[8px]"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
            
            {/* Desktop: Centered with max width */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-[896px]" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/H1kKyo6qcpY"
                  title="Client Testimonial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-[8px]"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Component */}
        <Testimonials hideHeader={true} />
      </div>
    </Layout>
  );
}

