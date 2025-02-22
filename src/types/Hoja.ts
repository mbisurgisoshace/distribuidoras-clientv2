export interface Hoja {
  hoja_ruta_id: number | null;
  hoja_ruta_numero: string;
  apellido: string;
  nombre: string;
  fecha: string;
  zona_id: number;
  chofer_id: number;
  acompanante_id: number;
  camion_id: number;
  km_inicial: number;
  km_final: number;
  gasto_combustible: number;
  gasto_otro: number;
  gasto_viatico: number;
  cobranza: number;
  cheques: number;
  efectivo: number;
  control_stock: boolean;
  cierre_stock: boolean;
  estado: boolean;
}

export interface NewHoja {
  fecha: string;
  km_inicial: number;
  zona_id: number | null;
  hoja_ruta_numero: string;
  chofer_id: number | null;
  camion_id: number | null;
  acompanante_id: number | null;
}
