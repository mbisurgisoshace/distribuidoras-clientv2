import React from 'react';
import Select, { Option } from '../../../components/Select';
import { Pedido } from '../../../types/Pedidos';

interface InfoAdicionalPedidoProps {
  pedido: Pedido;
  hojasOptions: Option[];
  tiposOptions: Option[];
  estadosOptions: Option[];
  setPedido: (pedido: Pedido) => void;
}
export default function InfoAdicionalPedido({pedido, setPedido, hojasOptions, tiposOptions, estadosOptions}: InfoAdicionalPedidoProps): React.ReactElement {
  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <Select id={'tipo_movimiento_id'} label='Tipo de Pedido' options={tiposOptions}
              value={pedido?.tipo_movimiento_id!} onOptionChange={(value) => {
        setPedido({
          ...pedido,
          tipo_movimiento_id: value as number
        });
      }} />
      <Select id={'hoja_ruta_id'} label='Asignar a Chofer' options={hojasOptions} value={pedido?.hoja_ruta_id!}
              onOptionChange={(value) => {
                setPedido({
                  ...pedido,
                  hoja_ruta_id: value === -1 ? null : value as number,
                  estado_movimiento_id: value === -1 ? 2 : 1
                });
              }} />
      <Select id={'estado_movimiento_id'} label='Estado de Pedido' options={estadosOptions}
              value={pedido?.estado_movimiento_id!} onOptionChange={(value) => {
        setPedido({
          ...pedido,
          estado_movimiento_id: value as number
        });
      }} />
    </div>
  )
}