import { useState } from 'react';

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';

import {
  flexRender,
  SortingState,
  useReactTable,
  PaginationState,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import data from './data.json';
import HeaderCell from './Cells/HeaderCell';
import { useMonitorColumns } from './useMonitorColumns';
import DataCell from './Cells/DataCell';

export default function MonitorPedidos() {
  const { columns } = useMonitorColumns();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col h-full overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <div className="flex-1 overflow-y-auto relative">
        {/* {isLoading && <LoadingData />} */}
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
      {/* <Pagination
          pageSize={50}
          siblingsCount={1}
          totalCount={total}
          onNextPage={table.nextPage}
          onPreviousPage={table.previousPage}
          currentPage={table.getState().pagination.pageIndex + 1}
          onPageChange={(pageNumber) => {
            table.setPageIndex(pageNumber - 1);
            onPageChange(pageNumber);
          }}
        /> */}
    </div>
  );
}
