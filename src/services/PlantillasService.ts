import BaseService from './baseService';

export default class PlantillasService extends BaseService {
  static plantillasClienteRoute = '/plantillas/{cliente_id}';

  public static async getPlantillasCliente(
    cliente_id: number
  ): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(
      this.buildRoute(this.plantillasClienteRoute, { cliente_id })
    );
  }

  public static async updatePlantillasCliente(
    cliente_id: number,
    dias: any[]
  ): Promise<void> {
    return await this.putJSONRequest(
      this.buildRoute(this.plantillasClienteRoute, { cliente_id }),
      dias
    );
  }
}
