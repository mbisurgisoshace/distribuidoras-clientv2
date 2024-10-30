import BaseService from './baseService';
import { Chofer } from '../types/Chofer';

export default class ChoferesService extends BaseService {
  static choferesRoute = '/choferes';

  public static async getChoferes(): Promise<Array<Chofer>> {
    return await this.getRequest<Array<Chofer>>(this.choferesRoute);
  }
}
