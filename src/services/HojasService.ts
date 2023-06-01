import BaseService from './baseService';
import { EstadoMovimiento } from '../types/Pedidos';

export default class HojasService extends BaseService {
  static hojasByEstadoRoute = '/hojas/estado/{estado}';

  public static async getHojasByEstado(estado: number): Promise<Array<any>> {
    return await this.getRequest<any[]>(
      this.buildRoute(this.hojasByEstadoRoute, { estado: 1 })
    );
  }
}
