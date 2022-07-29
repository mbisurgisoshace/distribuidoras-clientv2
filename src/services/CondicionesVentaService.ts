import BaseService from './baseService';

export default class CondicionesVentaService extends BaseService {
  static condicionesVentaRoute = '/condicionesVenta';

  public static async getCondicionesVenta(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.condicionesVentaRoute);
  }
}
