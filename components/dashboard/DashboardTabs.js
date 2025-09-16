import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  DocumentDuplicateIcon, 
  BuildingLibraryIcon, 
  ChartBarIcon, 
  LinkIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function DashboardTabs() {
  const router = useRouter();
  const { pathname } = router;
  
  const tabs = [
    { 
      name: 'Priority Content', 
      href: '/dashboard/priority-content', 
      icon: DocumentDuplicateIcon,
      current: pathname === '/dashboard/priority-content'
    },
    { 
      name: 'Campaign Builder', 
      href: '/dashboard/campaign-builder', 
      icon: BuildingLibraryIcon,
      current: pathname === '/dashboard/campaign-builder'
    },
    { 
      name: 'Link Progress', 
      href: '/dashboard/link-progress', 
      icon: ChartBarIcon,
      current: pathname === '/dashboard/link-progress'
    },
    { 
      name: 'Link Domains', 
      href: '/dashboard/link-domains', 
      icon: LinkIcon,
      current: pathname === '/dashboard/link-domains'
    },
    { 
      name: 'Settings', 
      href: '/dashboard/settings', 
      icon: Cog6ToothIcon,
      current: pathname === '/dashboard/settings'
    },
  ];
  
  return (
    <div className="border-b-[2.5px] border-black">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`
              group flex items-center whitespace-nowrap py-4 px-1 border-b-[2.5px] font-medium text-sm
              ${tab.current
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            aria-current={tab.current ? 'page' : undefined}
          >
            <tab.icon
              className={`
                mr-2 h-5 w-5 flex-shrink-0
                ${tab.current ? 'text-black' : 'text-gray-400 group-hover:text-gray-500'}
              `}
              aria-hidden="true"
            />
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}