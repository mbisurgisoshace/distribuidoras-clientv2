import React from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { columns } from './columns';
import Pagination from '../../../components/Table/Pagination';

interface TablaClientesProps {
  data: any;
}

export default function TablaClientes({
  data,
}: TablaClientesProps): React.ReactElement {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const getDataCellClassnames = (columnId: string) => {
    if (columnId === 'cliente_id') return 'px-3 py-4 text-sm text-gray-500';

    if (columnId === 'razon_social')
      return 'w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6';

    if (columnId === 'actions')
      return 'py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6';

    return 'hidden px-3 py-4 text-sm text-gray-500 sm:table-cell';
  };

  const getHeaderCellClassnames = (columnId: string) => {
    if (columnId === 'cliente_id' || columnId === 'razon_social')
      return 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6';

    if (columnId === 'actions') return 'relative py-3.5 pl-3 pr-4 sm:pr-6';

    return 'hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell';
  };

  return (
    <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className={getHeaderCellClassnames(header.id)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
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
                  <td
                    key={cell.id}
                    className={getDataCellClassnames(cell.column.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageSize={50}
        siblingsCount={1}
        totalCount={data.length}
        onNextPage={table.nextPage}
        onPreviousPage={table.previousPage}
        currentPage={table.getState().pagination.pageIndex + 1}
        onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
      />
    </div>
  );
}
