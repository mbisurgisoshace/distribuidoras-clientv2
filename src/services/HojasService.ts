import BaseService from './baseService';

import { Hoja } from '../types/Hoja';

export default class HojasService extends BaseService {
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
}
