import BaseService from './baseService';

export default class ClientesService extends BaseService {
  static clientesRoute = '/clientes';
  static searchClientesRoute = '/clientes/filter';

  public static async getClientes(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.clientesRoute);
  }

  public static async searchClientes(
    filterText: string,
    pageSize: number,
    currentPage: number
  ): Promise<Array<any>> {
    return await this.postJSONRequest<any, Array<any>>(
      this.searchClientesRoute,
      {
        filterText,
        pageSize,
        currentPage,
      }
    );
  }
}
