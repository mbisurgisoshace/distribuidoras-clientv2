import BaseService from './baseService';
import { EstadoMovimiento } from '../types/Pedidos';

export default class EstadoMovimientosService extends BaseService {
  static estadoMovimientosRoute = '/estadosMovimiento';

  public static async getEstadoMovimientos(): Promise<Array<EstadoMovimiento>> {
    return await this.getRequest<Array<EstadoMovimiento>>(this.estadoMovimientosRoute);
  }
}
