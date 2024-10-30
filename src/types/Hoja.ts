export interface Hoja {
  hoja_ruta_id: number | null;
  hoja_ruta_numero: string;
  apellido: string;
  nombre: string;
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
