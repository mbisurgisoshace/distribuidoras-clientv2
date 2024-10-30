import moment from 'moment';
import numeral from 'numeral';
import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/table-core';
import { CloudIcon } from '@heroicons/react/outline';

export const useMonitorColumns = () => {
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
        accessorKey: 'MovimientoEncID',
        header: 'Pedido #',
        cell: (props) => {
          let color = '';
          if (props.row.original.Reclamo) {
            color = 'bg-red-600';
          }
          return (
            <div className="flex items-center">
              <div className={`w-2 h-2 b-ra rounded-lg ${color} mr-2`} />
              <span
                onClick={() =>
                  window.open(`/pedidos/${props.getValue()}`, '_blank')
                }
                className="cursor-pointer hover:underline hover:text-indigo-500"
              >
                {props.getValue() as string}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'Fecha',
        header: 'Fecha',
        cell: (props) =>
          moment(props.getValue() as string, 'YYYY-MM-DD').format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'ClienteID',
        header: 'Razon Social',
        cell: (props) => (
          <>
            <dl>
              <span className="font-medium text-gray-800">
                {props.getValue() as string}
              </span>
              <span className="truncate text-gray-700">{` - ${props.row.original.RazonSocial}`}</span>
            </dl>
            <dl className="font-normal">
              <dd className="truncate text-gray-500">
                {props.row.original.Direccion}
              </dd>
            </dl>
          </>
        ),
      },
      {
        accessorKey: 'TipoMovimientoNombre',
        header: 'Tipo',
        cell: (props) => {
          let color = '';
          const tipo = props.getValue() as string;

          if (tipo === 'QR') color = 'bg-red-100 text-red-800';
          if (tipo === 'Redes') color = 'bg-blue-100 text-blue-800';
          if (tipo === 'Voleo') color = 'bg-indigo-100 text-indigo-800';
          if (tipo === 'Pedido') color = 'bg-yellow-100 text-yellow-800';
          if (tipo === 'PreRuteo') color = 'bg-green-100 text-green-800';

          return (
            <span
              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${color}`}
            >
              {tipo}
            </span>
          );
        },
      },
      {
        accessorKey: 'EstadoMovimientoNombre',
        header: 'Estado',
        cell: (props) => {
          let color = '';
          const estado = props.getValue() as string;

          if (estado === 'Asignado') color = 'bg-yellow-100 text-yellow-800';
          if (estado === 'Sin Asignar') color = 'bg-gray-100 text-gray-800';
          if (estado === 'Entregado') color = 'bg-green-100 text-green-800';
          if (estado === 'No Entregado') color = 'bg-red-100 text-red-800';
          if (estado === 'Rechazado') color = 'bg-orange-100 text-orange-800';
          if (estado === 'Comunicado') color = 'bg-blue-100 text-blue-800';

          return (
            <span
              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${color}`}
            >
              {estado}
            </span>
          );
        },
      },
      {
        accessorKey: 'Detalle',
        header: 'Detalle',
        cell: (props) => {
          return <div className={'w-64'}>{props.renderValue() as string}</div>;
        },
      },
      {
        accessorKey: 'Total',
        header: 'Total',
        cell: (props) => {
          return (
            <div className={'w-32'}>
              {numeral(props.renderValue()).format('$0,0.00')}
            </div>
          );
        },
      },
      {
        accessorKey: 'CanalNombre',
        header: 'Canal',
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'CondicionVentaNombre',
        header: 'Condicion de Venta',
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'Apellido',
        header: 'Chofer',
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'Observaciones',
        header: 'Observaciones',
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'Sincronizado',
        header: 'Sincronizado',
        cell: (props) => {
          const sincronizado = props.getValue() as boolean;

          return (
            <div>
              <CloudIcon
                className={`h-6 w-6 m-auto ${
                  sincronizado ? 'text-green-400' : 'text-red-400'
                }`}
                aria-hidden="true"
              />
            </div>
          );
        },
      },
    ],
    []
  );

  return { columns };
};
