import BaseService from './baseService';
import { CondicionVenta } from '../types/CondicionVenta';

export default class CondicionesVentaService extends BaseService {
  static condicionesVentaRoute = '/condicionesVenta';

  public static async getCondicionesVenta(): Promise<Array<CondicionVenta>> {
    return await this.getRequest<Array<CondicionVenta>>(this.condicionesVentaRoute);
  }
}
