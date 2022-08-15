import BaseService from './baseService';

export default class ZonasService extends BaseService {
  static zonasRoute = '/zonas';
  static subzonasRoute = '/subzonas';

  public static async getZonas(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.zonasRoute);
  }

  public static async getSubzonas(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.subzonasRoute);
  }
}
