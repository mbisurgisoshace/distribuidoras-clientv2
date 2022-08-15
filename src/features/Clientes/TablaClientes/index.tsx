import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  flexRender,
  useReactTable,
  PaginationState,
  getCoreRowModel,
} from '@tanstack/react-table';

import { CloudIcon, PlusIcon } from '@heroicons/react/outline';

import DataCell from './Cells/DataCell';
import HeaderCell from './Cells/HeaderCell';
import { useClienteColumns } from './useClienteColumns';
import Pagination from '../../../components/Table/Pagination';
import LoadingData from '../../../components/Table/LoadingData';
import FilterClientes from './FilterClientes';
import OptionsButton from '../../../components/OptionsButton';

interface TablaClientesProps {
  data: any;
  total: number;
  isLoading: boolean;
  onPageChange: (currentPage: number) => void;
  onFilterApply: (filterText: string) => void;
}

export default function TablaClientes({
  data,
  total,
  isLoading,
  onPageChange,
  onFilterApply,
}: TablaClientesProps): React.ReactElement {
  const navigate = useNavigate();
  const { columns } = useClienteColumns();

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 50,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    onPageChange(pageIndex + 1);
  }, [pageIndex]);

  const table = useReactTable({
    data,
    columns,
    pageCount: -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Clientes
          </h2>
        </div>
        <div className="flex">
          <OptionsButton
            mainOption={{
              name: 'Nuevo Cliente',
              onClick: () => navigate('/clientes/new'),
              icon: (
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              ),
            }}
            options={[
              {
                name: 'Sincronizar',
                onClick: () => {},
                icon: (
                  <CloudIcon className='className="-ml-1 mr-2 h-5 w-5 text-gray-500"' />
                ),
              },
            ]}
          />
        </div>
      </div>
      <FilterClientes
        onApplyFilter={(filterValue) => {
          onFilterApply(filterValue);
          table.resetPageIndex(true);
        }}
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
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
          totalCount={total}
          onNextPage={table.nextPage}
          onPreviousPage={table.previousPage}
          currentPage={table.getState().pagination.pageIndex + 1}
          onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
        />
      </div>
    </div>
  );
}
