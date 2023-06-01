import BaseService from './baseService';
import { TipoMovimiento } from '../types/Pedidos';

export default class TipoPedidosService extends BaseService {
  static tipoPedidosRoute = '/tiposMovimiento';

  public static async getTipoPedidos(): Promise<Array<TipoMovimiento>> {
    return await this.getRequest<Array<TipoMovimiento>>(this.tipoPedidosRoute);
  }
}
