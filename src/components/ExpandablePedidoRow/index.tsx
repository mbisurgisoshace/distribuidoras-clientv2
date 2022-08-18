import numeral from 'numeral';
import { Row } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

import MovimientosService from '../../services/MovimientosService';

interface ExpandablePedidoRowProps {
  row: Row<any>;
}

export default function ExpandablePedidoRow({ row }: ExpandablePedidoRowProps) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const movimientoId = row.original.movimiento_enc_id;
    getItems(movimientoId);
  }, [row]);

  const getItems = async (movimientoId: number) => {
    const items = await MovimientosService.getDetalleMovimiento(movimientoId);
    setItems(items);
  };

  if (items.length === 0) return null;

  return (
    <>
      <tr className="bg-indigo-50">
        <th className="text-xs px-2 py-2 pl-11 text-left sm:text-sm font-semibold text-gray-900">
          Codigo
        </th>
        <th className="text-xs px-2 py-2 text-left sm:text-sm font-semibold text-gray-900">
          Cantidad
        </th>
        <th className="text-xs px-2 py-2 text-left sm:text-sm font-semibold text-gray-900">
          Precio
        </th>
        <th className="hidden px-2 py-2 text-left text-sm font-semibold text-gray-900 sm:table-cell"></th>
        <th className="hidden px-2 py-2 text-left text-sm font-semibold text-gray-900 sm:table-cell"></th>
        <th className=""></th>
      </tr>
      {items.map((item: any) => {
        return (
          <tr className="bg-gray-50">
            <td className="text-xs pl-11 whitespace-nowrap px-2 py-2 sm:text-sm text-gray-900">
              {item.envase_nombre}
            </td>
            <td className="text-xs whitespace-nowrap text-right px-2 py-2 sm:text-sm text-gray-900">
              {item.cantidad}
            </td>
            <td className="text-xs whitespace-nowrap text-right px-2 py-2 sm:text-sm text-gray-900">
              {numeral(item.monto / item.cantidad).format('$0,0.00')}
            </td>
            <td className="hidden sm:table-cell"></td>
            <td className="hidden sm:table-cell"></td>
            <td className=""></td>
          </tr>
        );
      })}
    </>
  );
}
