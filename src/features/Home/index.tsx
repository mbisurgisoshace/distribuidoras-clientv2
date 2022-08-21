import moment from 'moment';
import { useState, useEffect } from 'react';
import { FilterIcon } from '@heroicons/react/outline';

import OuterWrapper from '../../layouts/OuterWrapper';
import MonitorPedidos from './Monitor/MonitorPedidos';
import FilterPanel from './Monitor/FilterPanel';
import MovimientosService from '../../services/MovimientosService';

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data: any[] = await MovimientosService.searchMovimientos({
        desde: moment().format('DD-MM-YYYY'),
        hasta: moment().format('DD-MM-YYYY'),
      });

      setData(data);
    };

    getData();
  }, []);

  const onSearch = async (filters: any) => {
    const data: any[] = await MovimientosService.searchMovimientos(filters);
    setData(data);
    setIsFiltersOpen(false);
  };

  return (
    <OuterWrapper fullWidth>
      <div className="flex flex-col h-full relative z-0 overflow-auto focus:outline-none xl:order-last md:rounded-lg">
        <div>
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </div>
        <FilterPanel
          isOpen={isFiltersOpen}
          onApplyFilter={onSearch}
          onClose={() => setIsFiltersOpen(false)}
        />
        <MonitorPedidos data={data} />
      </div>
    </OuterWrapper>
  );
}
