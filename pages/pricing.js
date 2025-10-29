import Layout from '../components/layout/Layout';
import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  // FAQs for Link Building
  const linkBuildingFAQs = [
    {
      question: "How long until I see results from link building?",
      answer: "This depends on many factors including your website's age, authority, competition, etc. Generally, initial results can be seen within 3-6 months, with more significant improvements over time."
    },
    {
      question: "What types of links do you build?",
      answer: "We focus on high-quality, relevant, and editorial links from authoritative websites in your industry. Our approach emphasizes natural link acquisition through valuable content and relationships."
    },
    {
      question: "How do you report on progress?",
      answer: "We provide comprehensive monthly reports that track rankings, traffic growth, new links built, and their impact. Our dashboard gives you a clear view of your campaign's performance."
    },
    {
      question: "Do you require a minimum commitment?",
      answer: "Yes, we typically require a 3-month minimum commitment as link building is a long-term strategy that requires consistent effort to show meaningful results."
    },
    {
      question: "Can you work with sites in any niche?",
      answer: "While we specialize in SaaS and B2B technology companies, we can work with businesses in most industries. Some highly regulated or restricted niches may require special consideration."
    },
    {
      question: "Do I need to create content for the links?",
      answer: "No, our team handles all content creation needed for link building. We have expert writers who create high-quality content tailored to your industry and target sites."
    }
  ];

  // FAQs about GrowthOG
  const aboutGrowthOGFAQs = [
    {
      question: "What makes GrowthOG different from other link building agencies?",
      answer: "We focus exclusively on SaaS companies at different growth stages, with specialized strategies for each phase. Our team has deep experience in the SaaS industry, and we emphasize quality over quantity."
    },
    {
      question: "How do you find link opportunities?",
      answer: "We use a proprietary process that combines competitor analysis, relationship building with publishers, and strategic content development to identify the most valuable link opportunities."
    },
    {
      question: "How many links will I get each month?",
      answer: "This varies by package. Our Startup package typically includes 8-10 links monthly, Growth includes 25+, and Enterprise 40+. We focus on quality rather than arbitrary numbers."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "We guarantee the delivery of high-quality links as specified in your package. While we don't guarantee specific ranking positions (no ethical SEO company can), we have a proven track record of success."
    },
    {
      question: "How quickly can you start my campaign?",
      answer: "Once you're onboarded, we can typically begin work within 2 weeks. The first month involves strategy development, with link acquisition starting in earnest from month 2."
    }
  ];

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            className={`w-[14px] h-[14px] ${star <= rating ? 'text-[#FFC107]' : 'text-[#E5E7EB]'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <Layout
      seo={{
        title: 'Pricing | GrowthOG',
        description: 'Choose the right plan for your SaaS growth stage with our link building packages.',
      }}
    >
      <div className="py-10">
        <div className="max-w-[1280px] mx-auto px-8">
          {/* Link Building Packages */}
          <div className="border-[2.5px] border-black rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-white p-8 md:p-[32px]">
            <h1 className="text-[36px] font-extrabold text-black leading-[1.2]">Link Building Packages</h1>
            <p className="text-[18px] font-normal text-[#4B5563] leading-[1.4] mt-3">
              Choose the right plan for your SaaS growth stage
            </p>

            <div className="mt-8">
              <h2 className="text-[20px] font-bold text-black leading-[1.3]">Monthly Packages</h2>
              <p className="text-[16px] font-normal text-[#6B7280] leading-[1.5] mt-2">
                Get fully managed monthly link building solution
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
              {/* Startup Plan */}
              <div className="border-[2.5px] border-black rounded-[8px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow duration-200 bg-white flex flex-col">
                <div>
                  <h3 className="text-[24px] font-bold text-black">Startup</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-[32px] font-extrabold text-black">$2,999</span>
                    <span className="text-[16px] font-normal text-[#6B7280] ml-1">/mo</span>
                  </div>
                  
                  <div className="flex items-center mt-2 mb-6">
                    <div className="inline-flex items-center bg-[#F3F4F6] rounded-[4px] px-2 py-1">
                      <StarRating rating={3} />
                      <span className="text-[14px] font-medium text-[#6B7280] ml-1.5">8+ Links Per Month</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-6 pl-6">
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Average of 10-20 Links</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Competitor Backlink Gap Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Custom Reporting Dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Detailed Link Planning</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Keyword Analysis</span>
                  </li>
                </ul>
                
                <div className="mt-auto">
                  <button className="w-full bg-black text-white py-3 px-6 rounded-[6px] text-[16px] font-semibold hover:bg-[#333333] transition-colors duration-200 text-center">
                    Build Campaign
                  </button>
                </div>
              </div>

              {/* Growth Plan */}
              <div className="border-[2.5px] border-black rounded-[8px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow duration-200 bg-white flex flex-col">
                <div>
                  <h3 className="text-[24px] font-bold text-black">Growth</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-[32px] font-extrabold text-black">$9,999</span>
                    <span className="text-[16px] font-normal text-[#6B7280] ml-1">/mo</span>
                  </div>
                  
                  <div className="flex items-center mt-2 mb-6">
                    <div className="inline-flex items-center bg-[#F3F4F6] rounded-[4px] px-2 py-1">
                      <StarRating rating={4} />
                      <span className="text-[14px] font-medium text-[#6B7280] ml-1.5">25+ Links Per Month</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-6 pl-6">
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Average of 20-40 Links</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Authority Links Included</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Anchor Text Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Target Page Planning</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Identical Linking Optimization</span>
                  </li>
                </ul>
                
                <div className="mt-auto">
                  <button className="w-full bg-black text-white py-3 px-6 rounded-[6px] text-[16px] font-semibold hover:bg-[#333333] transition-colors duration-200 text-center">
                    Build Campaign
                  </button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="border-[2.5px] border-black rounded-[8px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-shadow duration-200 bg-white flex flex-col">
                <div>
                  <h3 className="text-[24px] font-bold text-black">Enterprise</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-[32px] font-extrabold text-black">$19,999</span>
                    <span className="text-[16px] font-normal text-[#6B7280] ml-1">/mo</span>
                  </div>
                  
                  <div className="flex items-center mt-2 mb-6">
                    <div className="inline-flex items-center bg-[#F3F4F6] rounded-[4px] px-2 py-1">
                      <StarRating rating={5} />
                      <span className="text-[14px] font-medium text-[#6B7280] ml-1.5">40+ Links Per Month</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-6 pl-6">
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Average of 50-80+ Links</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Authority Links Included</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Topic Editorial Audit</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">Multi-domain Distribution</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-[6px] w-[6px] bg-black rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-[15px] font-normal text-black leading-[1.6]">VP Call with Founder</span>
                  </li>
                </ul>
                
                <div className="mt-auto">
                  <button className="w-full bg-black text-white py-3 px-6 rounded-[6px] text-[16px] font-semibold hover:bg-[#333333] transition-colors duration-200 text-center">
                    Build Campaign
                  </button>
                </div>
              </div>
            </div>

            {/* Link Building 101 */}
            <div className="mb-12">
              <h2 className="text-[24px] font-bold text-black">Link Building 101</h2>
              <p className="text-[16px] font-normal text-[#6B7280] mt-2 mb-6">
                Frequently asked questions about our link building process
              </p>

              <div className="space-y-0">
                {linkBuildingFAQs.map((faq, index) => (
                  <div key={index} className="border-b-[2.5px] border-black">
                    <button
                      className="flex justify-between items-center w-full py-4 text-left hover:bg-[#F9FAFB] transition-colors duration-150"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="text-[16px] font-semibold text-black">{faq.question}</span>
                      <svg 
                        className={`w-4 h-4 text-black transition-transform duration-200 ${activeAccordion === index ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        activeAccordion === index ? 'max-h-[200px] pb-4' : 'max-h-0'
                      }`}
                    >
                      <p className="text-[15px] font-normal text-[#4B5563] leading-[1.6]">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About GrowthOG */}
            <div>
              <h2 className="text-[24px] font-bold text-black">About GrowthOG</h2>
              <p className="text-[16px] font-normal text-[#6B7280] mt-2 mb-6">
                Learn more about how we work and what makes us different
              </p>

              <div className="space-y-0">
                {aboutGrowthOGFAQs.map((faq, index) => (
                  <div key={index} className="border-b-[2.5px] border-black">
                    <button
                      className="flex justify-between items-center w-full py-4 text-left hover:bg-[#F9FAFB] transition-colors duration-150"
                      onClick={() => toggleAccordion(index + 100)} // Using offset to distinguish from first set
                    >
                      <span className="text-[16px] font-semibold text-black">{faq.question}</span>
                      <svg 
                        className={`w-4 h-4 text-black transition-transform duration-200 ${activeAccordion === index + 100 ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        activeAccordion === index + 100 ? 'max-h-[200px] pb-4' : 'max-h-0'
                      }`}
                    >
                      <p className="text-[15px] font-normal text-[#4B5563] leading-[1.6]">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t-[2.5px] border-black py-10">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <Link href="/" 
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
                1
              </Link>
              <Link href="/services"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
                2
              </Link>
              <Link href="/pricing"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] bg-black border-[2.5px] border-black text-[14px] font-medium text-white">
                3
              </Link>
              <Link href="/resources"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
                4
              </Link>
              <Link href="/case-studies"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
                5
              </Link>
              <Link href="/about-us"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] border-[2.5px] border-black text-[14px] font-medium text-black hover:bg-gray-50">
                6
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
