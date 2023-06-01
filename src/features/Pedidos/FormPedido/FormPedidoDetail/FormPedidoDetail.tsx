import React from 'react';
import TableSelect from '../../../../components/Table/TableSelect';
import NumberInput from '../../../../components/Table/NumberInput';
import CurrencyInput from '../../../../components/Table/CurrencyInput';
import { MinusIcon } from '@heroicons/react/solid';
import { ItemPedido } from '../../../../types/Pedidos';

interface FormPedidoDetailProps {
  items: any;
  productos: any[];
  onRemoveItem: (idx: number) => void;
  onEditItem: (key: keyof ItemPedido, index: number, value: any) => void;
}
export default function FormPedidoDetail({items, productos, onEditItem, onRemoveItem}: FormPedidoDetailProps): React.ReactElement {
  const productosOptions = productos.map((producto) => ({
    value: producto.envase_id,
    label: producto.envase_nombre
  }))

  return (
    <table className="mt-2 min-w-full">
      <thead className="bg-gray-50">
      <tr>
        <th className='py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6 w-80'>Producto</th>
        <th className='py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6'>Cantidad</th>
        <th className='py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6'>Precio</th>
        <th className='py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6'>Total</th>
      </tr>
      </thead>
      <tbody>
      {items.map((item: any, idx: number) => (
        <tr key={idx}>
          <td className='p-1'>
            <TableSelect id='envase_id' value={item.envase_id} options={productosOptions} onOptionChange={(value) => onEditItem('envase_id', idx, value)} />
          </td>
          <td className='p-1'>
            <NumberInput id={'cantidad'} name={'cantidad'} value={item.cantidad} onChange={(name, value) => onEditItem('cantidad', idx, value)} />
          </td>
          <td className='p-1'>
            <CurrencyInput id={'cantidad'} name={'precio'} value={item.precio} onChange={(name, value) => onEditItem('precio', idx, value)} />
          </td>
          <td className='p-1'>
            <CurrencyInput id={'monto'} name={'monto'} value={item.monto} onChange={(name, value) => {}} disabled />
          </td>
          <td>
            <button
              type="button"
              onClick={() => onRemoveItem(idx)}
              className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <MinusIcon className="h-2 w-2" aria-hidden="true" />
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}