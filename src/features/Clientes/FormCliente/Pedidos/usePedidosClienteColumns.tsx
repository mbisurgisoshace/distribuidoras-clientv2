import moment from 'moment';
import numeral from 'numeral';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ColumnDef, Row, Table } from '@tanstack/table-core';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';

export const usePedidosClienteColumns = () => {
  const onExpandPedido = (row: Row<any>, table: Table<any>) => {
    if (row.getIsExpanded()) return row.toggleExpanded(false);

    table.toggleAllRowsExpanded(false);
    row.toggleExpanded(true);
  };

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'movimiento_enc_id',
        header: 'Id',
        cell: ({ row, getValue, table }) => {
          const fechaFormateada = moment(row.original.fecha).format(
            'DD/MM/YYYY'
          );

          return (
            <>
              <button
                {...{
                  onClick: () => onExpandPedido(row, table),
                  style: { cursor: 'pointer' },
                }}
              >
                {row.getIsExpanded() ? (
                  <ChevronDownIcon className="-ml-1 mr-2 h-3.5 w-3.5 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="-ml-1 mr-2 h-3.5 w-3.5 text-gray-500" />
                )}
              </button>

              {getValue()}

              <dl className="font-normal lg:hidden">
                <dd className="mt-1 truncate text-gray-700">{`${fechaFormateada}`}</dd>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                  {row.original.condicion_venta_nombre}
                </dd>
              </dl>
            </>
          );
        },
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha',
        cell: (props) => {
          const fechaFormateada = moment(props.getValue() as any).format(
            'DD/MM/YYYY'
          );
          return fechaFormateada;
        },
      },
      {
        accessorKey: 'tipo_movimiento_nombre',
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
        accessorKey: 'condicion_venta_nombre',
        header: 'Condicion de Venta',
        cell: (props) => props.renderValue(),
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: (props) => {
          const totalFormateado = numeral(props.getValue()).format('$0,0.00');
          return <div className="text-right">{totalFormateado}</div>;
        },
      },
      {
        id: 'actions',
        header: '',
        cell: (props) => (
          <div className="text-center">
            <Link
              className="text-indigo-600 hover:text-indigo-900"
              to={`/pedidos/${props.row.original.movimiento_enc_id}`}
            >
              Ver
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  return { columns };
};
