import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { IClienteView } from '../../../types/Cliente';
import { useDebounce } from '../../../hooks/useDebounce';
import OuterWrapper from '../../../layouts/OuterWrapper';

import AutocompleteClientes from './AutocompleteClientes';
import ClientesService from '../../../services/ClientesService';
import FormPedidoDetail from './FormPedidoDetail/FormPedidoDetail';
import ClienteMap from '../../Clientes/FormCliente/Form/ClienteMap/ClienteMap';
import { PlusIcon } from '@heroicons/react/solid';
import Select from '../../../components/Select';
import Input from '../../../components/Input';
import Datepicker from '../../../components/Datepicker';
import moment from 'moment';
import numeral from 'numeral';
import LoadingData from '../../../components/Table/LoadingData';
import { usePedidoForm } from './usePedidoForm';
import DetalleCliente from './DetalleCliente';
import InfoAdicionalPedido from './InfoAdicionalPedido';
import PedidoSatisfactorio from './PedidoSatisfactorio';

export default function FormPedido(): React.ReactElement {
  const { pedidoId } = useParams();
  const {
    query,
    pedido,
    coords,
    setQuery,
    setPedido,
    onAddItem,
    productos,
    isLoading,
    onEditItem,
    newPedidoId,
    resetSearch,
    onRemoveItem,
    tiposOptions,
    hojasOptions,
    onCrearPedido,
    onEditarPedido,
    estadosOptions,
    selectedCliente,
    onSelectCliente,
    onConfirmarNuevoPedido,
    condicionesVentaOptions,
  } = usePedidoForm(pedidoId);
  const [isSearching, setIsSearching] = useState(false);
  const debounceValue = useDebounce<string>(query, 1000);
  const [clientes, setClientes] = useState<IClienteView[]>([]);

  useEffect(() => {
    getClientes(debounceValue);
  }, [debounceValue]);

  const getClientes = async (queryText: string) => {
    if (queryText.length === 0) return;
    setIsSearching(true);
    const clientes = await ClientesService.queryClientes(queryText);
    setIsSearching(false);
    setClientes(clientes);
  };

  const calcularTotalPedido = () => {
    return pedido.items.reduce((prev: any, curr: any) => {
      return prev + curr.monto;
    }, 0);
  };

  return (
    <OuterWrapper>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Nuevo Pedido
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-3 xl:mt-6 relative pb-3.5">
          {isLoading && <LoadingData />}
          <div className="col-span-2 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="flex items-center gap-4">
              <div>
                <Datepicker
                  id="fecha"
                  name="fecha"
                  label="Fecha"
                  value={
                    pedido?.fecha
                      ? moment(pedido.fecha, 'DD-MM-YYYY').toDate()
                      : new Date()
                  }
                  onChange={(date) => {
                    setPedido({
                      ...pedido,
                      fecha: moment(date).format('DD-MM-YYYY'),
                    });
                  }}
                />
              </div>
              <div className="flex-1">
                <AutocompleteClientes
                  loading={isSearching}
                  options={clientes}
                  onClear={() => {
                    resetSearch();
                  }}
                  value={selectedCliente}
                  onOptionChange={onSelectCliente}
                  placeholder="Buscar clientes ..."
                  onQueryChange={(query) => setQuery(query)}
                />
              </div>
              <button className="rounded bg-indigo-100 px-2 py-1 text-sm font-normal text-indigo-500 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Agregar Cliente
              </button>
            </div>

            <div className="mt-4">
              <ClienteMap
                lat={coords.lat || undefined}
                lng={coords.lng || undefined}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <h5 className="text-lg font-medium leading-7 text-gray-900 sm:truncate">
                Detalles del Pedido
              </h5>
              <button
                type="button"
                onClick={onAddItem}
                className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-2 w-2" aria-hidden="true" />
              </button>
            </div>

            <FormPedidoDetail
              items={pedido.items}
              productos={productos}
              onEditItem={onEditItem}
              onRemoveItem={onRemoveItem}
            />

            <div className="relative mt-4 mb-4">
              <div className="flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <div className="flex justify-end pl-4 pr-4">
              <div>
                <span className={'font-medium'}>Total</span>
                <span className={'font-medium w-32 inline-block text-right'}>
                  {`${numeral(calcularTotalPedido()).format('$0,0.00')}`}
                </span>
              </div>
            </div>
            <div className="relative mt-4 mb-4">
              <div className="flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-64">
                <Select
                  id={'condicion_venta_id'}
                  label="Condicion de Venta"
                  options={condicionesVentaOptions}
                  value={pedido?.condicion_venta_id!}
                  onOptionChange={(value) => {
                    setPedido({
                      ...pedido,
                      condicion_venta_id: value as number,
                    });
                  }}
                />
              </div>
              <div className={'flex-1'}>
                <Input
                  id={'observaciones'}
                  type={'text'}
                  name={'observaciones'}
                  label={'Observaciones'}
                  value={pedido?.observaciones}
                  onChange={(name, value) => {
                    setPedido({
                      ...pedido,
                      [name]: value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-col">
            <DetalleCliente cliente={selectedCliente} />

            <InfoAdicionalPedido
              pedido={pedido}
              hojasOptions={hojasOptions}
              tiposOptions={tiposOptions}
              estadosOptions={estadosOptions}
              setPedido={setPedido}
            />

            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                if (pedidoId && !isNaN(parseInt(pedidoId))) {
                  onEditarPedido();
                } else {
                  onCrearPedido();
                }
              }}
              className={`mt-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {`${
                pedidoId && !isNaN(parseInt(pedidoId))
                  ? 'Editar Pedido'
                  : 'Crear Pedido'
              }`}
            </button>
          </div>
        </div>
        {newPedidoId && (
          <PedidoSatisfactorio
            onClose={() => onConfirmarNuevoPedido()}
            newPedidoId={newPedidoId}
          />
        )}
      </div>
    </OuterWrapper>
  );
}
