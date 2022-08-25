import React, { useState } from 'react';

import { MenuIcon } from '@heroicons/react/outline';
import Sidebar from './Sidebar/Sidebar';

interface OuterWrapperProps {
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function OuterWrapper({
  children,
  fullWidth = false,
}: OuterWrapperProps): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-full">
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
      <div className="h-full md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="main-mobile sm:h-full sm:flex-1">
          <div className="py-1 sm:py-6 h-full">
            <div
              className={`${
                fullWidth ? 'max-w-full' : 'max-w-7xl'
              } mx-auto px-4 sm:px-6 md:px-8 h-full`}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
