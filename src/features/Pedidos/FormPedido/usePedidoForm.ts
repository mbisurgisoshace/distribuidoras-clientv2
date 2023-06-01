import { useEffect, useState } from 'react';
import moment from 'moment/moment';

import { Hoja } from '../../../types/Hoja';
import { EstadoMovimiento, ItemPedido, Pedido, TipoMovimiento } from '../../../types/Pedidos';
import HojasService from '../../../services/HojasService';
import TipoPedidosService from '../../../services/TipoPedidosService';
import EstadoMovimientosService from '../../../services/EstadoMovimientosService';
import CondicionesVentaService from '../../../services/CondicionesVentaService';
import { CondicionVenta } from '../../../types/CondicionVenta';
import ProductosService from '../../../services/ProductosService';
import { IClienteView } from '../../../types/Cliente';
import PrecioService from '../../../services/PreciosService';
import MovimientosService from '../../../services/MovimientosService';
import toaster from '../../../components/Toast/toaster';

const initData: Pedido = {
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
}

type Coords = {
  lat: number | undefined,
  lng: number | undefined
}
export const usePedidoForm = () => {
  const [query, setQuery] = useState('');
  const [pedido, setPedido] = useState<Pedido>(initData);
  const [hojas, setHojas] = useState<Hoja[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [precios, setPrecios] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<IClienteView>();
  const [tiposPedido, setTiposPedido] = useState<TipoMovimiento[]>([]);
  const [estadosPedido, setEstadosPedido] = useState<EstadoMovimiento[]>([]);
  const [newPedidoId, setNewPedidoId] = useState<number | undefined>(undefined);
  const [condicionesVenta, setCondicionesVenta] = useState<CondicionVenta[]>([]);
  const [coords, setCoords] = useState<Coords>({
    lat: undefined,
    lng: undefined
  });

  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    await Promise.all([getHojas(), getProductos(), getTiposPedido(), getEstadosPedido(), getCondicionesVenta()])
    setIsLoading(false);
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

  const onSelectCliente = async (cliente: IClienteView) => {
    console.log(cliente);
    const precios = await PrecioService.getPrecios(cliente.lista_precio_id!);
    setPedido({
      ...pedido,
      cliente_id: cliente.cliente_id!,
      condicion_venta_id: cliente.condicion_venta_id
    });
    setPrecios(precios);
    setSelectedCliente(cliente);
    setCoords({ lat: cliente.latitud, lng: cliente.longitud });
  };

  const onAddItem = () => {
    pedido.items.push({
      envase_id: '',
      cantidad: '',
      precio: '',
      monto: ''
    });

    setPedido({
      ...pedido
    });
  }

  const onEditItem = (key: keyof ItemPedido, index: number, value: string) => {
    const row = pedido.items[index];
    // @ts-ignore
    row[key] = value;

    if (key === 'envase_id') {
      const precioProducto = precios.find(precio => precio.envase_id === value);
      if (precioProducto) {
        row.precio = precioProducto.precio;
      }
    }

    const precio = parseFloat(row.precio as string || '0');
    const cantidad = parseFloat(row.cantidad as string || '0');

    if (key === 'cantidad' || key === 'precio') {
      row.monto = precio * cantidad;
    }
    setPedido({
      ...pedido
    });
  };

  const onRemoveItem = (idx: number) => {
    pedido.items.splice(idx, 1);
    setPedido({
      ...pedido
    });
  };

  const resetSearch = () => {
    setQuery('');
    setPedido({
      ...pedido,
      cliente_id: null,
      condicion_venta_id: null
    });
    setSelectedCliente(undefined);
    setCoords({ lat: undefined, lng: undefined });
  }

  const onCrearPedido = async () => {
    setIsLoading(true);

    try {
      const pedidoId = await MovimientosService.createMovimiento(pedido);
      setNewPedidoId(pedidoId);
    } catch (err) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'El pedido no se ha podido guardar.'
      });
    }

    setIsLoading(false);
  };

  const onConfirmarNuevoPedido = () => {
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
    });
    setNewPedidoId(undefined);
    setSelectedCliente(undefined);
    setCoords({ lat: undefined, lng: undefined });
  }

  const hojasOptions = hojas.map((hoja) => ({
    value: hoja.hoja_ruta_id!,
    label: `${hoja.apellido}, ${hoja.nombre} - ${hoja.hoja_ruta_numero}`
  }));

  hojasOptions.unshift({
    value: -1,
    label: 'Sin Chofer'
  })

  return {
    query,
    coords,
    pedido,
    precios,
    setQuery,
    setPedido,
    productos,
    isLoading,
    onAddItem,
    onEditItem,
    newPedidoId,
    resetSearch,
    onRemoveItem,
    hojasOptions,
    onCrearPedido,
    onSelectCliente,
    selectedCliente,
    onConfirmarNuevoPedido,
    tiposOptions: tiposPedido.map(tipo => ({
      value: tipo.tipo_movimiento_id,
      label: tipo.tipo_movimiento_nombre
    })),
    estadosOptions: estadosPedido.map(estado => ({
      value: estado.estado_movimiento_id,
      label: estado.estado_movimiento_nombre
    })),
    condicionesVentaOptions: condicionesVenta.map(condicion => ({
      value: condicion.condicion_venta_id,
      label: condicion.condicion_venta_nombre
    }))
  }
}