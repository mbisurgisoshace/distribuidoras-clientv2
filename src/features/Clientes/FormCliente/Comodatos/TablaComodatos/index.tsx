import React from 'react';
import {
  flexRender,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';

import DataCell from './Cells/DataCell';
import HeaderCell from './Cells/HeaderCell';
import { useComodatosClienteColumns } from '../useComodatosClienteColumns';
import ExpandableComodatoRow from '../../../../../components/ExpandableComodatoRow';

interface TablaPedidosProps {
  data: any;
}

export default function TablaPedidos({
  data,
}: TablaPedidosProps): React.ReactElement {
  const { columns } = useComodatosClienteColumns();
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    manualExpanding: true,
    onExpandedChange: setExpanded,
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
            <>
              <tr
                key={row.id}
                className={`${row.getIsExpanded() ? 'bg-indigo-200' : ''}`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <DataCell
                      key={cell.id}
                      id={cell.id}
                      columnId={cell.column.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </DataCell>
                  );
                })}
              </tr>
              {row.getIsExpanded() && (
                <ExpandableComodatoRow row={row} colSpan={6} />
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
