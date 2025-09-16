import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function CaseStudy({ caseStudy }) {
  const [activeHeading, setActiveHeading] = useState('');

  // Check if we're on the client-side before using browser APIs
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const headings = document.querySelectorAll('h2[id], h3[id]');
        let currentActiveHeading = '';
        
        headings.forEach(heading => {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) { // Adjust threshold as needed
            currentActiveHeading = heading.id;
          }
        });
        
        setActiveHeading(currentActiveHeading);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active heading
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!caseStudy) {
    return (
      <Layout seo={{ title: 'Loading... | GrowthOG', description: 'Case study is loading' }}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      seo={{
        title: `${caseStudy.title} | GrowthOG`,
        description: caseStudy.description,
      }}
    >
      {/* Hero Section with Black Background */}
      <div className="bg-black text-white pt-20 md:pt-32 pb-10">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm uppercase tracking-wider mb-4">
              <span className="border border-gray-700 rounded-full px-4 py-1">{caseStudy.industry}</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">{caseStudy.title}</h1>
            <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-8 md:mb-12">
              {caseStudy.subtitle}
            </p>
            
            {/* Metrics Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-8">
              {caseStudy.metrics.map((metric, index) => (
                <div key={index} className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-800">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 md:py-12">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Table of Contents */}
            <div className="w-full md:w-1/4 lg:w-1/5 order-2 md:order-1 mb-6 md:mb-0">
              <div className="md:sticky md:top-24 border border-secondary-200 rounded-lg p-5">
                <h3 className="font-bold mb-4 text-lg">Table of Contents</h3>
                <nav className="space-y-2">
                  {caseStudy.tableOfContents.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.id}`}
                      className={`block text-sm py-1 hover:text-primary-600 transition-colors ${
                        activeHeading === item.id ? 'text-primary-600 font-medium' : 'text-secondary-600'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-2/4 lg:w-3/5 order-1 md:order-2">
              <div className="prose prose-lg max-w-none">
                <section>
                  <h2 id="client-background" className="text-2xl font-bold mb-4 text-black">Client's Background</h2>
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    <li><strong>Industry:</strong> {caseStudy.clientInfo.industry}</li>
                    <li><strong>Location:</strong> {caseStudy.clientInfo.location}</li>
                    <li><strong>Company size:</strong> {caseStudy.clientInfo.companySize}</li>
                    <li><strong>Project budget:</strong> {caseStudy.clientInfo.budget}</li>
                    <li><strong>Targeted Audience:</strong> {caseStudy.clientInfo.audience}</li>
                  </ul>

                  <h3 className="text-xl font-bold mb-3 text-black">Content Assets</h3>
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    {caseStudy.contentAssets.map((asset, index) => (
                      <li key={index} className="mb-2">
                        <strong>{asset.title}:</strong> {asset.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 id="challenges" className="text-2xl font-bold mb-4 text-black">Challenges</h2>
                  <p className="mb-6">
                    {caseStudy.challenges}
                  </p>
                </section>

                <section>
                  <h2 id="strategies" className="text-2xl font-bold mb-4 text-black">Strategies</h2>
                  <p className="mb-6">
                    {caseStudy.strategies}
                  </p>
                </section>

                <section>
                  <h2 id="implementation" className="text-2xl font-bold mb-4 text-black">Implementation</h2>
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    <li><strong>Campaign Duration:</strong> {caseStudy.implementation.duration}</li>
                    <li>
                      <strong>Targeted pages:</strong>
                      <ul className="list-disc list-inside pl-6 mt-2">
                        {caseStudy.implementation.targetedPages.map((page, index) => (
                          <li key={index}>{page}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 id="results" className="text-2xl font-bold mb-4 text-black">Results</h2>
                  <p className="mb-4">
                    Please note that the "Post-Campaign" metrics captured in this case study are analyzed 
                    from the beginning of our collaboration until three months after the last link-building 
                    activity concluded (October 2024). This approach is taken because the effects of link-building 
                    efforts often manifest gradually over time.
                  </p>

                  <h3 className="text-xl font-bold mb-3 text-black">Key Performance Metrics</h3>
                  <div className="mb-6 border border-secondary-200 rounded-lg overflow-hidden">
                    {caseStudy.images && caseStudy.images.keyMetrics && (
                      <div className="p-4 bg-secondary-50">
                        <Image 
                          src={caseStudy.images.keyMetrics}
                          alt="Key Performance Metrics" 
                          width={800} 
                          height={400}
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-black">DR Distribution of Pages</h3>
                  <div className="mb-6 border border-secondary-200 rounded-lg overflow-hidden">
                    {caseStudy.images && caseStudy.images.drDistribution && (
                      <div className="p-4 bg-secondary-50">
                        <Image 
                          src={caseStudy.images.drDistribution}
                          alt="DR Distribution Chart" 
                          width={800} 
                          height={400}
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h2 id="testimonials" className="text-2xl font-bold mb-4 text-black">Client's Testimonials</h2>
                  <div className="space-y-6">
                    {caseStudy.testimonials.map((testimonial, index) => (
                      <blockquote key={index} className="border-l-4 border-primary-600 pl-4 py-2 italic">
                        <p className="mb-2">{testimonial.quote}</p>
                        <div className="text-secondary-600 text-sm">{testimonial.date}</div>
                      </blockquote>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Right Sidebar - CTA and Related Content */}
            <div className="w-full md:w-1/4 lg:w-1/5 order-3 mt-6 md:mt-0">
              <div className="md:sticky md:top-24 space-y-8">
                {/* Access Dashboard CTA */}
                <div className="bg-black text-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">Access Your GrowthOG Dashboard</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Track your link building progress and manage your campaigns
                  </p>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    <span className="text-black">Dashboard</span>
                  </Link>
                </div>

                {/* Want Backlinks Section */}
                <div className="bg-black rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">Want backlinks on autopilot?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Get expert link building services from GrowthOG
                  </p>
                  <a
                    href="/book-call"
                    className="flex items-center justify-center gap-2 w-full bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-black">Book a Call</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Define the paths for the case studies
  const paths = [
    { params: { slug: 'saas' } },
    { params: { slug: 'fintech' } },
  ];

  return { 
    paths, 
    fallback: true // Enable fallback for case studies not in initial list
  };
}

export async function getStaticProps({ params }) {
  try {
    // For now, we'll just use hardcoded data based on the slug
    if (params.slug === 'saas') {
      return {
        props: {
          caseStudy: {
            title: "182% Traffic Growth and 195% Increase in Organic Keywords in 18 Months",
            subtitle: "Facing stiff competition and tight finances, a beginner in SEO turned their luck around with our focused link-building approach.",
            industry: "SaaS / Technology",
            logo: "/images/case-studies/saas-logo.svg",
            metrics: [
              {
                value: "182%",
                label: "Traffic growth"
              },
              {
                value: "195%",
                label: "Keywords growth"
              },
              {
                value: "18 months",
                label: "674 links built"
              }
            ],
            clientInfo: {
              industry: "Collaboration & performance AI for individuals & teams",
              location: "Sydney, Australia",
              companySize: "Small business (11–50 employees)",
              budget: "Bootstrapped",
              audience: "Individuals and teams focused on self-development, goal setting, and enhancing personal and professional performance."
            },
            contentAssets: [
              {
                title: "Targeted, High-value content",
                description: "The content focuses on key areas like personal development, performance coaching, and AI integration. This creates opportunities for high-quality backlinks from reputable sources."
              },
              {
                title: "Optimized structure and Internal linking",
                description: "The blog features clear headings and organized sections, improving readability and navigation. Internal links to related content guide users to explore more and create valuable link-building opportunities."
              },
              {
                title: "UX and User engagement",
                description: "The blog's intuitive design, with clear CTAs and embedded YouTube videos, enhances user engagement and encourages longer visits."
              }
            ],
            challenges: "The client initially managed everything internally, from content creation to link outreach, but their organic traffic stagnated, and there was a lack of high-quality traffic that could convert into valuable sign-ups. Despite some DR leverage, their backlink profile lacked quality, which led to declining traffic as Google updates rolled out.",
            strategies: "The Growth OG team began by conducting a comprehensive audit of the site's backlink profile and content. We identified pages with untapped potential that were already ranking but needed the right push to climb higher in search results. With a focus on high-authority, niche-relevant backlinks, we strategically acquired links from domains that could significantly boost organic performance, all while optimizing the use of available resources within a lean budget. In parallel, we guided the team on content optimization to align with the link-building strategy, allowing them to focus on creating exceptional content while we managed the acquisition of backlinks. This collaboration helped drive stronger, more sustainable traffic growth, increase Domain Rating by one point, and achieve a 40% growth in organic keyword rankings within 6 months.",
            implementation: {
              duration: "From February 2024 to July 2024.",
              targetedPages: [
                "Homepage",
                "Informative blog about Ikigai",
                "Informative blog about Life planning",
                "Landing page about Team performance"
              ]
            },
            results: {
              metricsTable: [
                {
                  metric: "Traffic",
                  pre: "85,400",
                  post: "241,000"
                },
                {
                  metric: "Keywords",
                  pre: "5,840",
                  post: "17,228"
                }
              ]
            },
            testimonials: [
              {
                quote: "Confirming Jennifer all domains are now approved - thanks for tailoring the domains - they're all right in our wheelhouse in terms of their top organic keywords, so excellent domains - thanks!",
                date: "February 08, 2024"
              },
              {
                quote: "Thanks for the detailed rundown Jennifer, it's really helpful.",
                date: "March 20, 2024"
              },
              {
                quote: "Jennifer, thank you for your professionalism, organization, detailed service, and care in providing all the secured backlinks for Marlee. We've been very happy with the backlinks delivered, with your methodology, etc. It's been fantastic.",
                date: "July 29, 2024"
              },
              {
                quote: "Hi Russell, absolutely, please use my testimonial! I'd definitely be happy to recommend you in the future or use your services again if/when the budget becomes available. Jennifer has been so fantastic to work with!",
                date: "July 31, 2024"
              }
            ],
            images: {
              keyMetrics: "/images/case-studies/saas-performance-metrics.svg",
              drDistribution: "/images/case-studies/saas-dr-distribution.svg"
            },
            tableOfContents: [
              {
                id: "client-background",
                title: "Client's Background"
              },
              {
                id: "challenges",
                title: "Challenges"
              },
              {
                id: "strategies",
                title: "Strategies"
              },
              {
                id: "implementation",
                title: "Implementation"
              },
              {
                id: "results",
                title: "Results"
              },
              {
                id: "testimonials",
                title: "Client's Testimonials"
              }
            ]
          }
        }
      };
    } else if (params.slug === 'fintech') {
      return {
        props: {
          caseStudy: {
            title: "The 24-Link Strategy That Drove 48% Traffic Growth",
            subtitle: "How we increased organic traffic by 48% with just 24 strategic backlinks",
            industry: "Collaboration & Performance AI Platform",
            logo: "/images/case-studies/fintech-logo.svg",
            metrics: [
              {
                value: "48%",
                label: "Traffic growth"
              },
              {
                value: "40%",
                label: "Keywords growth"
              },
              {
                value: "6 months",
                label: "24 links built"
              }
            ],
            clientInfo: {
              industry: "Collaboration & performance AI for individuals & teams",
              location: "Sydney, Australia",
              companySize: "Small business (11–50 employees)",
              budget: "Bootstrapped",
              audience: "Individuals and teams focused on self-development, goal setting, and enhancing personal and professional performance."
            },
            contentAssets: [
              {
                title: "Targeted, High-value content",
                description: "The content focuses on key areas like personal development, performance coaching, and AI integration. This creates opportunities for high-quality backlinks from reputable sources."
              },
              {
                title: "Optimized structure and Internal linking",
                description: "The blog features clear headings and organized sections, improving readability and navigation. Internal links to related content guide users to explore more and create valuable link-building opportunities."
              },
              {
                title: "UX and User engagement",
                description: "The blog's intuitive design, with clear CTAs and embedded YouTube videos, enhances user engagement and encourages longer visits."
              }
            ],
            challenges: "The client initially managed everything internally, from content creation to link outreach, but their organic traffic stagnated, and there was a lack of high-quality traffic that could convert into valuable sign-ups. Despite some DR leverage, their backlink profile lacked quality, which led to declining traffic as Google updates rolled out.",
            strategies: "The Growth OG team began by conducting a comprehensive audit of the site's backlink profile and content. We identified pages with untapped potential that were already ranking but needed the right push to climb higher in search results. With a focus on high-authority, niche-relevant backlinks, we strategically acquired links from domains that could significantly boost organic performance, all while optimizing the use of available resources within a lean budget. In parallel, we guided the team on content optimization to align with the link-building strategy, allowing them to focus on creating exceptional content while we managed the acquisition of backlinks. This collaboration helped drive stronger, more sustainable traffic growth, increase Domain Rating by one point, and achieve a 40% growth in organic keyword rankings within 6 months.",
            implementation: {
              duration: "From February 2024 to July 2024",
              targetedPages: [
                "Homepage",
                "Informative blog about Ikigai",
                "Informative blog about Life planning",
                "Landing page about Team performance"
              ]
            },
            results: {
              metricsTable: [
                {
                  metric: "Traffic",
                  pre: "53,000",
                  post: "78,440"
                },
                {
                  metric: "Keywords",
                  pre: "1,892",
                  post: "2,649"
                }
              ]
            },
            testimonials: [
              {
                quote: "Confirming Jennifer all domains are now approved - thanks for tailoring the domains - they're all right in our wheelhouse in terms of their top organic keywords, so excellent domains - thanks!",
                date: "February 08, 2024"
              },
              {
                quote: "Thanks for the detailed rundown Jennifer, it's really helpful.",
                date: "March 20, 2024"
              },
              {
                quote: "Jennifer, thank you for your professionalism, organization, detailed service, and care in providing all the secured backlinks for Marlee. We've been very happy with the backlinks delivered, with your methodology, etc. It's been fantastic.",
                date: "July 29, 2024"
              },
              {
                quote: "Hi Russell, absolutely, please use my testimonial! I'd definitely be happy to recommend you in the future or use your services again if/when the budget becomes available. Jennifer has been so fantastic to work with!",
                date: "July 31, 2024"
              }
            ],
            images: {
              keyMetrics: "/images/case-studies/fintech-performance-metrics.svg",
              drDistribution: "/images/case-studies/fintech-dr-distribution.svg"
            },
            tableOfContents: [
              {
                id: "client-background",
                title: "Client's Background"
              },
              {
                id: "challenges",
                title: "Challenges"
              },
              {
                id: "strategies",
                title: "Strategies"
              },
              {
                id: "implementation",
                title: "Implementation"
              },
              {
                id: "results",
                title: "Results"
              },
              {
                id: "testimonials",
                title: "Client's Testimonials"
              }
            ]
          }
        }
      };
    }
    
    return {
      notFound: true,
    };
  } catch (error) {
    console.error('Error fetching case study:', error);
    return {
      notFound: true,
    };
  }
}