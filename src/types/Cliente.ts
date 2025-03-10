export interface ICliente {
  cliente_id?: number;
  razon_social: string;
  telefono: string;
  cuit: string;
  calle: string;
  altura: string;
  piso: string;
  depto: string;
  localidad: string;
  codigo_postal: string;
  entre: string;
  y: string;
  latitud: number;
  longitud: number;
  zona_sub_id: number | null;
  canal_id: number | null;
  subcanal_id: number | null;
  condicion_iva_id: number | null;
  condicion_venta_id: number | null;
  lista_precio_id: number | null;
  observaciones: string;
  estado: boolean;
}

export interface IClienteView extends ICliente {
  cliente_id: number;
  zona_id: number | null;
  sub_zona_id: number | null;
  sub_zona_nombre: string | null;
  canal_nombre: string | null;
  razon_social: string;
  cuit: string;
  telefono: string;
  entre: string;
  y: string;
}
