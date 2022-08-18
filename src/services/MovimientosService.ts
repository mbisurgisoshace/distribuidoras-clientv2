import BaseService from './baseService';

export default class MovimientosService extends BaseService {
  static movimientoDetalleRoute =
    '/movimientos/movimiento/{movimiento_enc_id}/detalle';

  public static async getDetalleMovimiento(movimientoId: number): Promise<any> {
    return await this.getRequest<any[]>(
      this.buildRoute(this.movimientoDetalleRoute, {
        movimiento_enc_id: movimientoId,
      })
    );
  }
}
