import BaseService from './baseService';

import { Hoja } from '../types/Hoja';

export default class HojasService extends BaseService {
  static hojasByEstadoRoute = '/hojas/estado/{estado}';

  public static async getHojasByEstado(estado: number): Promise<Array<Hoja>> {
    return await this.getRequest<Array<Hoja>>(
      this.buildRoute(this.hojasByEstadoRoute, { estado })
    );
  }
}
