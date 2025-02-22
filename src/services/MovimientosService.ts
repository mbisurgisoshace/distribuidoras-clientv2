import BaseService from './baseService';

export default class MovimientosService extends BaseService {
  static movimientosSearchRoute = '/movimientos/search';
  static movimientoByHoja = '/movimientos/{hoja_ruta_id}';
  static movimientoDetalleRoute =
    '/movimientos/movimiento/{movimiento_enc_id}/detalle';
  static movimientosActualizacionMasivaRoute =
    '/movimientos/actualizacion_masiva';
  static movimientosRoute = '/movimientos';
  static movimientoRoute = '/movimientos/movimiento/{movimiento_enc_id}';

  public static async getMovimiento(movimientoId: number): Promise<any> {
    return await this.getRequest<any[]>(
      this.buildRoute(this.movimientoRoute, {
        movimiento_enc_id: movimientoId,
      })
    );
  }
  public static async getDetalleMovimiento(movimientoId: number): Promise<any> {
    return await this.getRequest<any[]>(
      this.buildRoute(this.movimientoDetalleRoute, {
        movimiento_enc_id: movimientoId,
      })
    );
  }

  public static async getPedidosByHojaId(hojaId: number): Promise<any> {
    return await this.getRequest<any[]>(
      this.buildRoute(this.movimientoByHoja, {
        hoja_ruta_id: hojaId,
      })
    );
  }

  public static async searchMovimientos(filters: any): Promise<Array<any>> {
    return await this.postJSONRequest<any, any>(
      this.movimientosSearchRoute,
      filters
    );
  }

  public static async createMovimiento(pedido: any) {
    return await this.postJSONRequest<any, any>(this.movimientosRoute, pedido);
  }

  public static async updateMovimiento(id: number, pedido: any) {
    return await this.putJSONRequest(
      this.buildRoute(this.movimientoRoute, { movimiento_enc_id: id }),
      pedido
    );
  }
  public static async updateMovimientosMasivo(actualizacion: any) {
    return await this.putJSONRequest(
      this.movimientosActualizacionMasivaRoute,
      actualizacion
    );
  }
}
