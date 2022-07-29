import BaseService from './baseService';

export default class CondicionesIvaService extends BaseService {
  static condicionesIvaRoute = '/condicionesIva';

  public static async getCondicionesIva(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.condicionesIvaRoute);
  }
}
