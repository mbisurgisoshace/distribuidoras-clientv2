import React, { useState } from 'react';
import { FilterIcon, SearchIcon, XIcon } from '@heroicons/react/outline';

interface FilterClientesProps {
  onApplyFilter: (filterValue: string) => void;
}

export default function FilterClientes({
  onApplyFilter,
}: FilterClientesProps): React.ReactElement {
  const [filterValue, setFilterValue] = useState('');

  const onFiltrar = (e: any) => {
    e.preventDefault();
    onApplyFilter(filterValue);
  };

  const resetFilters = () => {
    onApplyFilter('');
    setFilterValue('');
  };

  return (
    <form className="mt-6 flex space-x-4" onSubmit={onFiltrar}>
      <div className="flex-1 min-w-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            type={'text'}
            name="search"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Buscar por codigo, razon social, calle o altura"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          />
          {filterValue && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
              <XIcon
                aria-hidden="true"
                onClick={resetFilters}
                className="h-5 w-5 text-gray-400"
              />
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
