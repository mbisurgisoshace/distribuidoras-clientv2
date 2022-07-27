import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import { usePagination } from './usePagination';

interface PaginationProps {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingsCount: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  pageSize,
  totalCount,
  onNextPage,
  currentPage,
  onPageChange,
  onPreviousPage,
}: PaginationProps): React.ReactElement {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  const onPageClicked = (range: number | string) => {
    if (typeof range === 'number') {
      onPageChange(range);
    }
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <span
          onClick={onPreviousPage}
          className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </span>
        <span
          onClick={onNextPage}
          className="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </span>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div></div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <span
              onClick={onPreviousPage}
              className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            {paginationRange.map((item) => (
              <span
                //key={item}
                aria-current="page"
                onClick={() => onPageClicked(item)}
                className={`cursor-pointer ${
                  item === currentPage
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {item}
              </span>
            ))}
            <span
              onClick={onNextPage}
              className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
}
