import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  // Function to extract headings from HTML content
  useEffect(() => {
    if (!content) return;

    // Parse the content to extract headings
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headingElements = tempDiv.querySelectorAll('h2, h3, h4');
    const extractedHeadings = Array.from(headingElements).map((heading) => {
      // Generate an ID if it doesn't exist
      const id = heading.id || heading.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      };
    });
    
    setHeadings(extractedHeadings);
  }, [content]);

  // Setup intersection observer to highlight active section
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  // Function to determine indent class based on heading level
  const getIndentClass = (level) => {
    switch (level) {
      case 3:
        return 'ml-4';
      case 4:
        return 'ml-8';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm sticky top-24">
      <h2 className="text-lg font-semibold mb-4 text-secondary-900">TABLE OF CONTENTS</h2>
      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id} className={getIndentClass(heading.level)}>
              <Link
                href={`#${heading.id}`}
                className={`block py-1 border-l-2 pl-3 transition-colors hover:text-primary-600 ${
                  activeId === heading.id
                    ? 'border-primary-600 text-primary-600 font-medium'
                    : 'border-secondary-200 text-secondary-600'
                }`}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;