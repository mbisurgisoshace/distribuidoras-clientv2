import moment from 'moment';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/table-core';
import { useNavigate } from 'react-router-dom';
import { LockOpenIcon } from '@heroicons/react/outline';

export const useHojasColumns = () => {
  const navigate = useNavigate();

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'HojaRutaID',
        header: 'Hoja de Ruta #',
        cell: (props) => (
          <span
            onClick={() => navigate(`/hojas/${props.getValue()}`)}
            className="cursor-pointer hover:underline hover:text-indigo-500"
          >
            {props.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'Apellido',
        header: 'Chofer',
        cell: (props) => {
          if (!props.row.original.Apellido && !props.row.original.Nombre) {
            return '-';
          }

          return `${props.row.original.Apellido}, ${props.row.original.Nombre}`;
        },
      },
      {
        accessorKey: 'Fecha',
        header: 'Fecha',
        cell: (props) => {
          const fecha = moment(props.getValue() as string)
            .utc()
            .format('DD/MM/YYYY');

          return fecha;
        },
      },
      {
        accessorKey: 'ControlStock',
        header: 'Control de Stock',
        cell: (props) => {
          let color = 'bg-red-500';
          if (props.row.original.ControlStock) {
            color = 'bg-green-500';
          }
          return (
            <div className="flex justify-center items-center">
              <div className={`w-2.5 h-2.5 rounded-lg ${color} mr-2`} />
            </div>
          );
        },
      },
      {
        accessorKey: 'CierreStock',
        header: 'Cierre de Stock',
        cell: (props) => {
          let color = 'bg-red-500';
          if (props.row.original.CierreStock) {
            color = 'bg-green-500';
          }
          return (
            <div className="flex justify-center items-center">
              <div className={`w-2.5 h-2.5 rounded-lg ${color} mr-2`} />
            </div>
          );
        },
      },
      {
        accessorKey: 'Estado',
        header: 'Estado',
        cell: (props) => {
          let color = 'bg-red-500';
          if (props.row.original.Estado) {
            color = 'bg-green-500';
          }
          return (
            <div className="flex justify-center items-center">
              <div className={`w-2.5 h-2.5 rounded-lg ${color} mr-2`} />
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: '',
        cell: (props) => (
          <div className="flex justify-center items-center">
            <button
              type="button"
              disabled={props.row.original.Estado}
              className={`rounded-full bg-white p-1 ${
                props.row.original.Estado
                  ? 'text-gray-500'
                  : 'text-indigo-500 hover:text-indigo-700'
              }`}
            >
              <LockOpenIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return { columns };
};
