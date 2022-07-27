import BaseService from './baseService';

export default class ClientesService extends BaseService {
  static clientesRoute = '/clientes';

  public static async getClientes(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.clientesRoute);
  }
}
