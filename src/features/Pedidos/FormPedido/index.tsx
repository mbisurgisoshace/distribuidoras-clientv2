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
import ProductosService from '../../../services/ProductosService';
import { EstadoMovimiento, TipoMovimiento } from '../../../types/Pedidos';
import TipoPedidosService from '../../../services/TipoPedidosService';
import EstadoMovimientosService from '../../../services/EstadoMovimientosService';
import Datepicker from '../../../components/Datepicker';
import moment from 'moment';
import HojasService from '../../../services/HojasService';
import numeral from 'numeral';
import CondicionesVentaService from '../../../services/CondicionesVentaService';
import MovimientosService from '../../../services/MovimientosService';
import toaster from '../../../components/Toast/toaster';
import LoadingData from '../../../components/Table/LoadingData';
import PrecioService from '../../../services/PreciosService';

export default function FormPedido(): React.ReactElement {
  const navigate = useNavigate();
  const { pedidoId } = useParams();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [hojas, setHojas] = useState<any[]>([]);
  const debounceValue = useDebounce<string>(query, 1000);
  const [productos, setProductos] = useState<any[]>([]);
  const [pedido, setPedido] = useState<any>({
    fecha: moment().format('DD-MM-YYYY'),
    tipo_movimiento_id: 2,
    estado_movimiento_id: 2,
    condicion_venta_id: null,
    visito: false,
    vendio: false,
    observaciones: '',
    items: []
  });
  const [clientes, setClientes] = useState<IClienteView[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<IClienteView>();
  const [tiposPedido, setTiposPedido] = useState<TipoMovimiento[]>([]);
  const [estadosPedido, setEstadosPedido] = useState<EstadoMovimiento[]>([]);
  const [condicionesVenta, setCondicionesVenta] = useState<any[]>([]);
  const [precios, setPrecios] = useState<any[]>([]);
  const [coords, setCoords] = useState<{lat: number | undefined, lng: number | undefined}>({lat: undefined, lng: undefined})

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    getClientes(debounceValue);
  }, [debounceValue]);

  const init = async () => {
    await Promise.all([getHojas(), getProductos(), getTiposPedido(), getEstadosPedido(), getCondicionesVenta()])
    setIsLoading(false);
  }
  const initPedido = async () => {

  }

  const getHojas = async () => {
    const hojas = await HojasService.getHojasByEstado(1);
    setHojas(hojas);
  }

  const getProductos = async () => {
    const productos = await ProductosService.getProductos();
    setProductos(productos);
  }

  const getTiposPedido = async () => {
    const tipos = await TipoPedidosService.getTipoPedidos();
    setTiposPedido(tipos);
  }

  const getEstadosPedido = async () => {
    const estados = await EstadoMovimientosService.getEstadoMovimientos();
    setEstadosPedido(estados);
  }

  const getCondicionesVenta = async () => {
    const condiciones = await CondicionesVentaService.getCondicionesVenta();
    setCondicionesVenta(condiciones);
  }
  const getClientes = async (queryText: string) => {
    setIsSearching(true);
    const clientes = await ClientesService.queryClientes(queryText);
    setIsSearching(false);
    setClientes(clientes);
  };

  const onSelectCliente = async (cliente: IClienteView) => {
    console.log(cliente);
    const precios = await PrecioService.getPrecios(cliente.lista_precio_id!);
    setPedido({
      ...pedido,
      cliente_id: cliente.cliente_id
    })
    setPrecios(precios);
    setSelectedCliente(cliente);
    setCoords({lat: cliente.latitud, lng: cliente.longitud})
  };

  const onAddItem = () => {
    pedido.items.push({
      envase_id: '',
      cantidad: '',
      precio: '',
      monto: ''
    })

    setPedido({
      ...pedido
    })
  }

  const onEditItem = (key: string, index: number, value: string) => {
    const row = pedido.items[index];
    row[key] = value;

    if (key === 'envase_id') {
      const precioProducto = precios.find(precio => precio.envase_id === value);
      if (precioProducto) {
        row.precio = precioProducto.precio;
      }
    }

    const precio = parseFloat(row.precio || 0);
    const cantidad = parseFloat(row.cantidad || 0);

    if (key === 'cantidad' || key === 'precio') {
      row.monto = precio * cantidad;
    }
    setPedido({
      ...pedido
    })
  }

  const onRemoveItem = (idx: number) => {
    pedido.items.splice(idx, 1);
    setPedido({
      ...pedido
    })
  }

  const calcularTotalPedido = () => {
    return pedido.items.reduce((prev: any, curr: any) => {
      return prev + (curr.monto)
    }, 0)
  }

  const onCrearPedido = async () => {
    setIsLoading(true);

    try {
      const pedidoId = await MovimientosService.createMovimiento(pedido);
      toaster().success({
        title: 'Pedido generado correctamente!',
        infoText: `El numero de pedido es ${pedidoId}.`,
      });

      setQuery('');
      setPedido({
        cliente_id: null,
        hoja_ruta_id: null,
        fecha: moment().format('DD-MM-YYYY'),
        tipo_movimiento_id: 2,
        estado_movimiento_id: 2,
        condicion_venta_id: null,
        visito: false,
        vendio: false,
        observaciones: '',
        items: []
      })
      setSelectedCliente(undefined);
      setCoords({lat: undefined, lng: undefined});
    } catch (err) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'El pedido no se ha podido guardar.',
      });
    }

    setIsLoading(false);
  }

  const tiposOptions = tiposPedido.map(tipo => ({
    value: tipo.tipo_movimiento_id,
    label: tipo.tipo_movimiento_nombre
  }))

  const estadosOptions = estadosPedido.map(estado => ({
    value: estado.estado_movimiento_id,
    label: estado.estado_movimiento_nombre
  }))

  const condicionesVentaOptions = condicionesVenta.map(condicion => ({
    value: condicion.condicion_venta_id,
    label: condicion.condicion_venta_nombre
  }));

  const hojasOptions = hojas.map((hoja) => ({
    value: hoja.hoja_ruta_id,
    label: `${hoja.apellido}, ${hoja.nombre} - ${hoja.hoja_ruta_numero}`
  }));

  hojasOptions.unshift({
    value: '',
    label: 'Sin Chofer'
  })
  console.log(pedido);
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
        <div className='grid grid-cols-3 gap-4 mt-6 relative'>
          {isLoading && <LoadingData />}
          <div className="col-span-2 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className='flex items-center gap-4'>
              <div>
                <Datepicker
                  id="fecha"
                  name="fecha"
                  label="Fecha"
                  value={pedido?.fecha ? moment(pedido.fecha, 'DD-MM-YYYY').toDate() : new Date()}
                  onChange={(date) => {
                    setPedido({
                      ...pedido,
                      fecha: moment(date).format('DD-MM-YYYY')
                    })
                  }}
                />
              </div>
              <div className='flex-1'>
                <AutocompleteClientes
                  loading={isSearching}
                  options={clientes}
                  onClear={() => {
                    setQuery('');
                    setPedido({
                      ...pedido,
                      cliente_id: null
                    })
                    setSelectedCliente(undefined);
                    setCoords({lat: undefined, lng: undefined});
                  }}
                  value={selectedCliente}
                  onOptionChange={onSelectCliente}
                  placeholder="Buscar clientes ..."
                  onQueryChange={(query) => setQuery(query)}
                />
              </div>
              <button
                className="rounded bg-indigo-100 px-2 py-1 text-sm font-normal text-indigo-500 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Agregar Cliente
              </button>
            </div>

            <div className='mt-4'>
              <ClienteMap lat={coords.lat || undefined} lng={coords.lng || undefined} />
            </div>

            <div className='mt-4 flex items-center gap-3'>
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

            <FormPedidoDetail items={pedido.items} productos={productos} onEditItem={onEditItem} onRemoveItem={onRemoveItem} />

            <div className="relative mt-4 mb-4">
              <div className="flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <div className='flex justify-end pl-4 pr-4'>
              <div>
                <span className={'font-medium'}>
                Total
              </span>
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

            <div className='flex items-center gap-4'>
              <div className='w-64'>
                <Select id={'condicion_venta_id'} label='Condicion de Venta' options={condicionesVentaOptions} value={pedido?.condicion_venta_id} onOptionChange={(value) => {
                  setPedido({
                    ...pedido,
                    condicion_venta_id: value
                  })
                }} />
              </div>
             <div className={'flex-1'}>
               <Input id={'observaciones'} type={'text'} name={'observaciones'} label={'Observaciones'} value={pedido?.observaciones} onChange={(name, value) => {
                 setPedido({
                   ...pedido,
                   [name]: value
                 })
               }} />
             </div>
            </div>
          </div>
          <div className='flex gap-4 flex-col'>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <h5 className="text-lg font-medium leading-7 text-gray-900 sm:truncate">
                Detalles del Cliente
              </h5>
              <div className="flex items-center mt-4">
                <div className="h-11 w-11 flex items-center justify-center rounded-full bg-indigo-200">
                  <span className='font-medium text-sm text-indigo-500'>{selectedCliente ? selectedCliente.canal_nombre?.substring(0, 3).toUpperCase() : ''}</span>
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">{selectedCliente ? selectedCliente.razon_social : 'Razon Social'}</div>
                  <div className="text-gray-500 text-sm">{selectedCliente ? selectedCliente.telefono : 'Telefono'}</div>
                </div>
              </div>
              <div className="relative mt-4 mb-4">
                <div className="flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{selectedCliente ? `${selectedCliente.calle} ${selectedCliente.altura}` : 'Direccion'}</div>
                <div className="text-gray-500 text-sm">{selectedCliente ? selectedCliente.sub_zona_nombre : 'Zona'}</div>
              </div>

              <button
                className="rounded mt-4 w-full bg-indigo-100 px-2 py-1 text-sm font-normal text-indigo-500 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Editar
              </button>
            </div>

            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <Select id={'tipo_movimiento_id'} label='Tipo de Pedido' options={tiposOptions} value={pedido?.tipo_movimiento_id} onOptionChange={(value) => {
                setPedido({
                  ...pedido,
                  tipo_movimiento_id: value
                })
              }} />
              <Select id={'hoja_ruta_id'} label='Asignar a Chofer' options={hojasOptions} value={pedido?.hoja_ruta_id} onOptionChange={(value) => {
                setPedido({
                  ...pedido,
                  hoja_ruta_id: value || null,
                  estado_movimiento_id: value ? 1 : 2
                })
              }} />
              <Select id={'estado_movimiento_id'} label='Estado de Pedido' options={estadosOptions} value={pedido?.estado_movimiento_id} onOptionChange={(value) => {
                setPedido({
                  ...pedido,
                  estado_movimiento_id: value
                })
              }} />
            </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => onCrearPedido()}
                className={`mt-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Crear Pedido
              </button>

          </div>
        </div>
      </div>
    </OuterWrapper>
  );
}
