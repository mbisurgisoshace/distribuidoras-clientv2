import BaseService from './baseService';

import { Hoja, NewHoja } from '../types/Hoja';

export default class HojasService extends BaseService {
  static hojaRoute = '/hojas/{hojaRutaId}';
  static hojasAbrirRoute = '/hojas/abrir';
  static hojasSearchRoute = '/hojas/search';
  static hojasByEstadoRoute = '/hojas/estado/{estado}';

  public static async getHojasByEstado(estado: number): Promise<Array<Hoja>> {
    return await this.getRequest<Array<Hoja>>(
      this.buildRoute(this.hojasByEstadoRoute, { estado })
    );
  }

  public static async searchHojas(filters: any): Promise<Array<any>> {
    return await this.postJSONRequest<any, any>(this.hojasSearchRoute, filters);
  }

  public static async abrirHojaRuta(
    hojaRuta: NewHoja,
    clientes: any[]
  ): Promise<Array<any>> {
    return await this.postJSONRequest<any, any>(this.hojasAbrirRoute, {
      hojaRuta,
      clientes,
    });
  }

  public static async borrarHoja(hojaRutaId: number): Promise<any> {
    return await this.deleteRequest<any>(
      this.buildRoute(this.hojaRoute, { hojaRutaId })
    );
  }
}
