import React from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';

import { usePedidosClienteColumns } from '../usePedidosClienteColumns';
import HeaderCell from './Cells/HeaderCell';
import DataCell from './Cells/DataCell';

interface TablaPedidosProps {
  data: any;
}

export default function TablaPedidos({
  data,
}: TablaPedidosProps): React.ReactElement {
  const { columns } = usePedidosClienteColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full mt-0 sm:mt-3.5 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <HeaderCell key={header.id} columnId={header.id}>
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
                  <DataCell
                    key={cell.id}
                    id={cell.id}
                    columnId={cell.column.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
