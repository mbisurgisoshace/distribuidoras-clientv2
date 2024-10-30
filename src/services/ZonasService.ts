import { Zona } from '../types/Zona';
import BaseService from './baseService';

export default class ZonasService extends BaseService {
  static zonasRoute = '/zonas';
  static subzonasRoute = '/subzonas';

  public static async getZonas(): Promise<Array<Zona>> {
    return await this.getRequest<Array<Zona>>(this.zonasRoute);
  }

  public static async getSubzonas(): Promise<Array<any>> {
    return await this.getRequest<Array<any>>(this.subzonasRoute);
  }
}
