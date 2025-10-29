import Layout from '../components/layout/Layout';
import Testimonials from '../components/home/Testimonials';
import Image from 'next/image';
import Link from 'next/link';

export default function Testimony() {
  return (
    <Layout
      seo={{
        title: 'Testimonials | GrowthOG',
        description: 'See what our clients have to say about working with GrowthOG.',
      }}
    >
      <div className="py-4">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="border-[2.5px] border-black rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-white p-4 md:p-6 mb-4">
            <h1 className="text-[28px] font-extrabold text-black leading-[1.2]">What our client says</h1>
            <p className="text-[16px] font-normal text-[#4B5563] leading-[1.4] mt-2">
              Don't just take our word for it. Here's what our clients have to say about working with GrowthOG.
            </p>
          </div>
          
          {/* Video Testimonial */}
          <div className="border-[2.5px] border-black rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-white p-1 sm:p-1 md:p-2 mb-3">
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
              <div className="relative w-full max-w-[1000px]" style={{ paddingBottom: '56.25%' }}>
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
            
            {/* Nextiva Logo Link */}
            <div className="mt-0 flex flex-col items-center">
              <Link 
                href="https://www.nextiva.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <div className="relative" style={{ width: '600px', height: '70px', overflow: 'hidden' }}>
                  <Image
                    src="/images/case-studies/image.png"
                    alt="Nextiva"
                    fill
                    className="hover:opacity-90 transition-opacity object-contain"
                    style={{ 
                      background: 'transparent',
                      transform: 'scale(1.4)',
                      objectPosition: 'top center',
                    }}
                  />
                </div>
              </Link>
              <p className="-mt-4 text-[13px] text-[#6B7280] text-center leading-tight">
                A customer experience tool
              </p>
            </div>
          </div>
        </div>
        
        {/* Testimonials Component */}
        <Testimonials hideHeader={true} />
      </div>
    </Layout>
  );
}

