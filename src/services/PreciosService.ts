import BaseService from './baseService';

export default class PrecioService extends BaseService {
  static listasPrecioRoute = '/precios';

  public static async getListasPrecio(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.listasPrecioRoute);
  }
}
