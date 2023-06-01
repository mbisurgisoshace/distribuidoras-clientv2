export interface TipoMovimiento {
  tipo_movimiento_id: number;
  tipo_movimiento_nombre: string;
}

export interface EstadoMovimiento {
  estado_movimiento_id: number;
  estado_movimiento_nombre: string;
}



export interface Pedido {
  fecha: string;
  movimiento_enc_id?: number;
  cliente_id: number | null;
  tipo_movimiento_id: number | null;
  estado_movimiento_id: number | null;
  condicion_venta_id: number | null;
  hoja_ruta_id: number | null;
  visito: boolean;
  vendio: boolean;
  observaciones: string;
  items: ItemPedido[];
}

export interface ItemPedido {
  movimiento_det_id?: number;
  movimiento_enc_id?: number;
  envase_id: number | string;
  cantidad: number | string;
  precio: number | string;
  monto: number | string;
}