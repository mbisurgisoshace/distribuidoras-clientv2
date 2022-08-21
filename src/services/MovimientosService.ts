import BaseService from './baseService';

export default class MovimientosService extends BaseService {
  static movimientosSearchRoute = '/movimientos/search';
  static movimientoDetalleRoute =
    '/movimientos/movimiento/{movimiento_enc_id}/detalle';

  public static async getDetalleMovimiento(movimientoId: number): Promise<any> {
    return await this.getRequest<any[]>(
      this.buildRoute(this.movimientoDetalleRoute, {
        movimiento_enc_id: movimientoId,
      })
    );
  }

  public static async searchMovimientos(filters: any): Promise<Array<any>> {
    return await this.postJSONRequest<any, any>(
      this.movimientosSearchRoute,
      filters
    );
  }
}
