import BaseService from './baseService';
import { Camion } from '../types/Camion';

export default class CamionesService extends BaseService {
  static camionesRoute = '/camiones';

  public static async getCamiones(): Promise<Array<Camion>> {
    return await this.getRequest<Array<Camion>>(this.camionesRoute);
  }
}
