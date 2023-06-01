import BaseService from './baseService';
import { ICliente } from '../types/Cliente';

export default class PrecioService extends BaseService {
  static listasPrecioRoute = '/precios';
  static listasPrecioDetalleRoute = '/precios/{precio_id}';

  public static async getListasPrecio(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.listasPrecioRoute);
  }

  public static async getPrecios(listaPrecioId: number): Promise<Array<any>> {
    return await this.getRequest<any[]>(
      this.buildRoute(this.listasPrecioDetalleRoute, { precio_id: listaPrecioId })
    );
  }
}
