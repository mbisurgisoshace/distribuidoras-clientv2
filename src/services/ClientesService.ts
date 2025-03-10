import BaseService from './baseService';
import { ICliente, IClienteView } from '../types/Cliente';

export default class ClientesService extends BaseService {
  static clientesRoute = '/clientes';
  static clienteRoute = '/clientes/{cliente_id}';
  static queryClientesRoute = '/clientes/search';
  static searchClientesRoute = '/clientes/filter';
  static plantillasClientesRoute = '/clientes/plantilla';
  static clienteComodatosRoute = '/comodatos/cliente/{cliente_id}';
  static clientePedidosRoute = '/clientes/{cliente_id}/lastPedidos';

  public static async getClientes(): Promise<Array<ICliente>> {
    return await this.getRequest<Array<ICliente>>(this.clientesRoute);
  }

  public static async getCliente(id: number): Promise<ICliente> {
    return await this.getRequest<ICliente>(
      this.buildRoute(this.clienteRoute, { cliente_id: id })
    );
  }

  public static async updateCliente(
    id: number,
    cliente: ICliente
  ): Promise<void> {
    return await this.putJSONRequest(
      this.buildRoute(this.clienteRoute, { cliente_id: id }),
      cliente
    );
  }

  public static async createCliente(cliente: ICliente): Promise<ICliente> {
    return await this.postJSONRequest<ICliente, ICliente>(
      this.clientesRoute,
      cliente
    );
  }

  public static async searchClientes(
    filterText: string,
    pageSize: number,
    currentPage: number
  ): Promise<Array<ICliente>> {
    return await this.postJSONRequest<any, Array<ICliente>>(
      this.searchClientesRoute,
      {
        filterText,
        pageSize,
        currentPage,
      }
    );
  }

  public static async queryClientes(
    filterText: string
  ): Promise<Array<IClienteView>> {
    return await this.getRequest<Array<IClienteView>>(
      this.buildQueryRoute(this.queryClientesRoute, { query: filterText })
    );
  }

  public static async getLastPedidos(clienteId: number): Promise<any[]> {
    return await this.getRequest(
      this.buildRoute(this.clientePedidosRoute, { cliente_id: clienteId })
    );
  }

  public static async getComodatosCliente(clienteId: number): Promise<any[]> {
    return await this.getRequest(
      this.buildRoute(this.clienteComodatosRoute, { cliente_id: clienteId })
    );
  }

  public static async getPlantillasClientes(
    zonaId: number,
    diaSemana: string
  ): Promise<Array<ICliente>> {
    return await this.getRequest<Array<ICliente>>(
      this.buildQueryRoute(this.plantillasClientesRoute, { zonaId, diaSemana })
    );
  }
}
