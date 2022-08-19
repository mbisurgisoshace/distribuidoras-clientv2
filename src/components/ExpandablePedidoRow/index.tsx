import numeral from 'numeral';
import { Row } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

import MovimientosService from '../../services/MovimientosService';

interface ExpandablePedidoRowProps {
  row: Row<any>;
  colSpan: number;
}

export default function ExpandablePedidoRow({
  row,
  colSpan,
}: ExpandablePedidoRowProps) {
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
      <tr>
        <td colSpan={colSpan} className="p-3 bg-gray-200">
          <div className="flex flex-col h-full overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-xs px-2 py-2 text-left sm:text-sm font-semibold text-gray-900">
                    Codigo
                  </th>
                  <th className="text-xs px-2 py-2 text-center sm:text-sm font-semibold text-gray-900">
                    Cantidad
                  </th>
                  <th className="text-xs px-2 py-2 text-center sm:text-sm font-semibold text-gray-900">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items.map((item: any) => {
                  return (
                    <tr>
                      <td className="text-xs whitespace-nowrap px-2 py-2 sm:text-sm text-gray-900">
                        {item.envase_nombre}
                      </td>
                      <td className="text-xs whitespace-nowrap text-right px-2 py-2 sm:text-sm text-gray-900">
                        {item.cantidad}
                      </td>
                      <td className="text-xs whitespace-nowrap text-right px-2 py-2 sm:text-sm text-gray-900">
                        {numeral(item.monto / item.cantidad).format('$0,0.00')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  );
}
