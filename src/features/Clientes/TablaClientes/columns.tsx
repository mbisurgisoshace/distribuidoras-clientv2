import React from 'react';
import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/table-core';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'cliente_id',
    header: 'Codigo',
    cell: (props) => props.renderValue(),
  },
  {
    accessorKey: 'razon_social',
    header: 'Razon Social',
    cell: (props) => (
      <>
        {props.getValue()}
        <dl className="font-normal lg:hidden">
          <dd className="mt-1 truncate text-gray-700">{`${props.row.original.calle} ${props.row.original.altura}`}</dd>
          <dd className="mt-1 truncate text-gray-500 sm:hidden">
            {props.row.original.telefono}
          </dd>
        </dl>
      </>
    ),
  },
  {
    accessorKey: 'calle',
    header: 'Calle',
    cell: (props) => props.renderValue(),
  },
  {
    accessorKey: 'altura',
    header: 'Altura',
    cell: (props) => props.renderValue(),
  },
  {
    accessorKey: 'telefono',
    header: 'Telefono',
    cell: (props) => props.renderValue(),
  },
  {
    id: 'actions',
    header: '',
    cell: (props) => (
      <Link
        className="text-indigo-600 hover:text-indigo-900"
        to={`clientes/${props.row.original.cliente_id}`}
      >
        Editar
      </Link>
    ),
  },
];
