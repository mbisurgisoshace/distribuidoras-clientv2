import BaseService from './baseService';

export default class CanalesService extends BaseService {
  static canalesRoute = '/canales';
  static subcanalesRoute = '/canales/subcanales';

  public static async getCanales(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.canalesRoute);
  }

  public static async getSubcanales(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.subcanalesRoute);
  }
}
