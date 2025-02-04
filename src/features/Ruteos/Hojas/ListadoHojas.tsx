import moment from 'moment';
import { useState } from 'react';
import {
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { FilterIcon, PlusIcon } from '@heroicons/react/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';

import FilterPanel from './FilterPanel';
import DataCell from './Cells/DataCell';
import HeaderCell from './Cells/HeaderCell';
import { NuevaHojaModal } from './NuevaHojaModal';
import { useHojasColumns } from './useHojasColumns';
import toaster from '../../../components/Toast/toaster';
import OptionsButton from '../../../components/OptionsButton';
import Pagination from '../../../components/Table/Pagination';
import LoadingData from '../../../components/Table/LoadingData';

interface ListadoHojasProps {
  data: any[];
  isLoading: boolean;
  onSearch: (filters: any) => void;
}

export default function ListadoHojas({
  data,
  onSearch,
  isLoading,
}: ListadoHojasProps) {
  const { columns } = useHojasColumns();
  const [filters, setFilters] = useState<any>({
    desde: new Date(),
    hasta: new Date(),
  });
  let [isOpen, setIsOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const onHojaAbierta = () => {
    setIsOpen(false);
    onSearch({
      ...filters,
      desde: moment(filters.desde).format('DD-MM-YYYY'),
      hasta: moment(filters.hasta).format('DD-MM-YYYY'),
    });
    toaster().success({
      title: 'Hoja de Ruta abierta',
      infoText: 'La hoja de ruta se abrio correctamente',
    });
  };

  return (
    <div className="flex flex-col h-full relative z-0 overflow-auto focus:outline-none xl:order-last md:rounded-lg">
      {isOpen && (
        <NuevaHojaModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onHojaAbierta={onHojaAbierta}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Hojas de Ruta
          </h2>
        </div>
        <div className="flex">
          <OptionsButton
            mainOption={{
              name: 'Nueva Hoja',
              onClick: () => setIsOpen(true),
              icon: (
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              ),
            }}
            options={[
              {
                name: 'Filtrar',
                onClick: () => setIsFiltersOpen(true),
                icon: (
                  <FilterIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
      <FilterPanel
        filters={filters}
        isOpen={isFiltersOpen}
        setFilters={setFilters}
        onApplyFilter={(filters) => {
          onSearch({
            ...filters,
            desde: moment(filters.desde).format('DD-MM-YYYY'),
            hasta: moment(filters.hasta).format('DD-MM-YYYY'),
          });
          setIsFiltersOpen(false);
        }}
        onClose={() => setIsFiltersOpen(false)}
      />
      <div className="flex flex-col h-full mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <div className="flex-1 overflow-y-auto relative">
          {isLoading && <LoadingData />}
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <HeaderCell columnId={header.id}>
                        <div
                          className={`${
                            header.column.getCanSort() ? 'cursor-pointer' : ''
                          } ? 'cursor-pointer' : '' flex items-center`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {{
                            asc: (
                              <ArrowUpIcon className="ml-2 h-3.5 w-3.5 font-medium text-indigo-600" />
                            ),
                            desc: (
                              <ArrowDownIcon className="ml-2 h-3.5 w-3.5 font-medium text-indigo-600" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </HeaderCell>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <DataCell id={cell.id} columnId={cell.column.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </DataCell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          pageSize={50}
          siblingsCount={1}
          totalCount={data.length}
          onNextPage={table.nextPage}
          onPreviousPage={table.previousPage}
          currentPage={table.getState().pagination.pageIndex + 1}
          onPageChange={(pageNumber) => {
            table.setPageIndex(pageNumber - 1);
          }}
        />
      </div>
    </div>
  );
}
