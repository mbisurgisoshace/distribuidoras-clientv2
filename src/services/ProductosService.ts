import BaseService from './baseService';

export default class ProductosService extends BaseService {
  static productosRoute = '/envases';
  public static async getProductos(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.productosRoute);
  }
}
