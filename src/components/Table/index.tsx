import React from 'react';
import {
  flexRender,
  useReactTable,
  PaginationState,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import Pagination from './Pagination';

interface TableProps {
  data: any;
  columns: any;
}

export default function Table({
  data,
  columns,
}: TableProps): React.ReactElement {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mt-8 flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              pageSize={10}
              siblingsCount={1}
              totalCount={data.length}
              onNextPage={table.nextPage}
              onPreviousPage={table.previousPage}
              currentPage={table.getState().pagination.pageIndex + 1}
              onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
