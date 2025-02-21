import { useEffect, useState } from 'react';
import moment from 'moment/moment';

import { Hoja } from '../../../types/Hoja';
import {
  EstadoMovimiento,
  ItemPedido,
  Pedido,
  TipoMovimiento,
} from '../../../types/Pedidos';
import HojasService from '../../../services/HojasService';
import TipoPedidosService from '../../../services/TipoPedidosService';
import EstadoMovimientosService from '../../../services/EstadoMovimientosService';
import CondicionesVentaService from '../../../services/CondicionesVentaService';
import { CondicionVenta } from '../../../types/CondicionVenta';
import ProductosService from '../../../services/ProductosService';
import { ICliente, IClienteView } from '../../../types/Cliente';
import PrecioService from '../../../services/PreciosService';
import MovimientosService from '../../../services/MovimientosService';
import toaster from '../../../components/Toast/toaster';
import ClientesService from '../../../services/ClientesService';

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
  items: [],
};

type Coords = {
  lat: number | undefined;
  lng: number | undefined;
};
export const usePedidoForm = (pedidoId: any) => {
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
  const [condicionesVenta, setCondicionesVenta] = useState<CondicionVenta[]>(
    []
  );
  const [coords, setCoords] = useState<Coords>({
    lat: undefined,
    lng: undefined,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (pedidoId && !isNaN(parseInt(pedidoId))) {
      const pedido = await getPedido(pedidoId);
      await getCliente(pedido.cliente_id);
      setPedido(pedido);
    } else {
      setPedido(initData);
    }
    await Promise.all([
      getHojas(),
      getProductos(),
      getTiposPedido(),
      getEstadosPedido(),
      getCondicionesVenta(),
    ]);
    setIsLoading(false);
  };
  const getHojas = async () => {
    const hojas = await HojasService.getHojasByEstado(1);
    setHojas(hojas);
  };

  const getCliente = async (clienteId: number) => {
    const cliente = await ClientesService.getCliente(clienteId);
    const precios = await PrecioService.getPrecios(cliente.lista_precio_id!);
    setPrecios(precios);
    setSelectedCliente(cliente as IClienteView);
    setCoords({ lat: cliente.latitud, lng: cliente.longitud });
  };
  const getPedido = async (pedidoId: number) => {
    return await MovimientosService.getMovimiento(pedidoId);
  };

  const getProductos = async () => {
    const productos = await ProductosService.getProductos();
    setProductos(productos);
  };

  const getTiposPedido = async () => {
    const tipos = await TipoPedidosService.getTipoPedidos();
    setTiposPedido(tipos);
  };

  const getEstadosPedido = async () => {
    const estados = await EstadoMovimientosService.getEstadoMovimientos();
    setEstadosPedido(estados);
  };

  const getCondicionesVenta = async () => {
    const condiciones = await CondicionesVentaService.getCondicionesVenta();
    setCondicionesVenta(condiciones);
  };

  const onSelectCliente = async (cliente: IClienteView) => {
    const hojaAsignada = hojas
      .filter((hoja) => {
        const fechaHoy = pedido.fecha;
        const fechaHoja = moment(hoja.fecha, 'YYYY-MM-DD').format('DD-MM-YYYY');
        return fechaHoy === fechaHoja;
      })
      .find((hoja) => hoja.zona_id === cliente.zona_id);

    const precios = await PrecioService.getPrecios(cliente.lista_precio_id!);
    setPedido({
      ...pedido,
      cliente_id: cliente.cliente_id!,
      condicion_venta_id: cliente.condicion_venta_id,
      hoja_ruta_id: hojaAsignada?.hoja_ruta_id || null,
      estado_movimiento_id: hojaAsignada ? 1 : 2,
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
      monto: '',
    });

    setPedido({
      ...pedido,
    });
  };

  const onEditItem = (key: keyof ItemPedido, index: number, value: string) => {
    const row = pedido.items[index];
    // @ts-ignore
    row[key] = value;

    if (key === 'envase_id') {
      const precioProducto = precios.find(
        (precio) => precio.envase_id === value
      );
      if (precioProducto) {
        row.precio = precioProducto.precio;
      }
    }

    const precio = parseFloat((row.precio as string) || '0');
    const cantidad = parseFloat((row.cantidad as string) || '0');

    if (key === 'cantidad' || key === 'precio') {
      row.monto = precio * cantidad;
    }
    setPedido({
      ...pedido,
    });
  };

  const onRemoveItem = (idx: number) => {
    pedido.items.splice(idx, 1);
    setPedido({
      ...pedido,
    });
  };

  const resetSearch = () => {
    setQuery('');
    setPedido({
      ...pedido,
      cliente_id: null,
      condicion_venta_id: null,
    });
    setSelectedCliente(undefined);
    setCoords({ lat: undefined, lng: undefined });
  };

  const onCrearPedido = async () => {
    setIsLoading(true);

    try {
      const pedidoId = await MovimientosService.createMovimiento(pedido);
      setNewPedidoId(pedidoId);
    } catch (err) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'El pedido no se ha podido guardar.',
      });
    }

    setIsLoading(false);
  };

  const onEditarPedido = async () => {
    setIsLoading(true);

    try {
      await MovimientosService.updateMovimiento(
        pedido.movimiento_enc_id!,
        pedido
      );
      toaster().success({
        title: 'Actualizado correctamente!',
        infoText: 'El pedido fue actualizado correctamente.',
      });
    } catch (err) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'El pedido no se ha podido guardar.',
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
      items: [],
    });
    setNewPedidoId(undefined);
    setSelectedCliente(undefined);
    setCoords({ lat: undefined, lng: undefined });
  };

  const onActualizarCliente = async (actualizarCliente: any) => {
    try {
      if (selectedCliente) {
        await ClientesService.updateCliente(
          selectedCliente?.cliente_id,
          actualizarCliente
        );
        setSelectedCliente({
          ...selectedCliente,
          ...actualizarCliente,
        });
        toaster().success({
          title: 'Actualizado correctamente!',
          infoText: 'El cliente fue actualizado correctamente.',
        });
      }
    } catch (err) {
      toaster().error({
        title: 'Ha ocurrido un error!',
        infoText: 'El cliente no se ha podido guardar.',
      });
    }
  };

  const hojasOptions = hojas
    .filter((hoja) => {
      const fechaHoy = pedido.fecha;
      const fechaHoja = moment(hoja.fecha, 'YYYY-MM-DD').format('DD-MM-YYYY');
      return fechaHoy === fechaHoja;
    })
    .map((hoja) => ({
      value: hoja.hoja_ruta_id!,
      label: `${hoja.apellido}, ${hoja.nombre} - ${hoja.hoja_ruta_numero}`,
    }));

  hojasOptions.unshift({
    value: -1,
    label: 'Sin Chofer',
  });

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
    onEditarPedido,
    onSelectCliente,
    selectedCliente,
    onActualizarCliente,
    onConfirmarNuevoPedido,
    tiposOptions: tiposPedido.map((tipo) => ({
      value: tipo.tipo_movimiento_id,
      label: tipo.tipo_movimiento_nombre,
    })),
    estadosOptions: estadosPedido.map((estado) => ({
      value: estado.estado_movimiento_id,
      label: estado.estado_movimiento_nombre,
    })),
    condicionesVentaOptions: condicionesVenta.map((condicion) => ({
      value: condicion.condicion_venta_id,
      label: condicion.condicion_venta_nombre,
    })),
  };
};
