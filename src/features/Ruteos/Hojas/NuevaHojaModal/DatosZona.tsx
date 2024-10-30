import moment from 'moment';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { Zona } from '../../../../types/Zona';
import { NewHoja } from '../../../../types/Hoja';
import Select from '../../../../components/Select';
import ClientesService from '../../../../services/ClientesService';

interface DatosZonaProps {
  hoja: NewHoja;
  zonas: Zona[];
  table: Table<any>;
  setHoja: (hoja: NewHoja) => void;
  setPlantilla: (plantilla: any[]) => void;
}

const DAY_MAP: Record<string, string> = {
  Monday: 'lunes',
  Tuesday: 'martes',
  Wednesday: 'miércoles',
  Thursday: 'jueves',
  Friday: 'viernes',
  Saturday: 'sábado',
  Sunday: 'domingo',
};

export const useColumns = () => {
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            readOnly
            id="select"
            name="select"
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        ),
        cell: ({ row }) => (
          <input
            readOnly
            id="select"
            name="select"
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        ),
      },
      {
        accessorKey: 'cliente_id',
        header: 'Codigo',
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'razon_social',
        header: 'Razon Social',
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'calle',
        header: 'Calle',
        cell: (props) => {
          return `${props.row.original.calle} ${props.row.original.altura}`;
        },
      },
    ],
    []
  );

  return columns;
};

export function DatosZona({
  hoja,
  setHoja,
  table,
  zonas,
  setPlantilla,
}: DatosZonaProps) {
  //const columns = useColumns();
  //const [data, setData] = useState<any[]>([]);

  const zonasOptions = zonas.map((zona) => ({
    value: zona.zona_id,
    label: zona.zona_nombre,
  }));

  const getClientes = useCallback(async () => {
    if (!hoja.zona_id || !hoja.fecha) return;
    const weekDay = moment(hoja.fecha, 'DD-MM-YYYY').format('dddd');

    const clientes = await ClientesService.getPlantillasClientes(
      hoja.zona_id,
      DAY_MAP[weekDay]
    );

    setPlantilla(clientes);
  }, [hoja.zona_id, hoja.fecha, setPlantilla]);

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <div className="w-[100%] ml-auto overflow-y-scroll">
      <div className="flex w-[80%] items-center gap-3 ml-auto">
        <div className="w-[60%]">
          <Select
            id={'zona_id'}
            label="Zona"
            options={zonasOptions}
            value={hoja.zona_id!}
            onOptionChange={(value) => {
              setHoja({
                ...hoja,
                zona_id: value === -1 ? null : (value as number),
              });
            }}
          />
        </div>
        <span
          className="font-semibold text-xs text-indigo-600 cursor-pointer hover:underline"
          onClick={getClientes}
        >
          Obtener ruteos
        </span>
      </div>
      <div className="p-1">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50 min-w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="w-full">
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="text-sm font-semibold">
                      {flexRender(
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
                    <td key={cell.id} id={cell.id} className="text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
