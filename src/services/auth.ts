import BaseService from './baseService';

interface AuthParams {
  username: string;
  password: string;
}

export default class AuthService extends BaseService {
  static loginRoute = '/auth/login';

  private static createAuthParams(
    username: string,
    password: string
  ): AuthParams {
    return {
      username: username.trim(),
      password: password.trim(),
    };
  }

  private static storeAuthToken(token: string): void {
    localStorage.setItem('__JWT_SECRET__', token);
  }

  private static storeUser(user: string): void {
    localStorage.setItem('__USER__', user);
  }

  public static async login(username: string, password: string): Promise<any> {
    try {
      const loginResponse = await this.postFormRequest<any>(
        this.loginRoute,
        this.createAuthParams(username, password)
      );

      if (loginResponse.status === 'success') {
        this.storeUser(JSON.stringify(loginResponse.user));
        this.storeAuthToken(loginResponse.token);
      }

      return loginResponse;
    } catch (e) {
      return {
        status: 'error',
        error: 'Ha ocurrido un error al intentar loguearse.',
      };
    }
  }

  public static logout(): boolean {
    localStorage.clear();
    return true;
  }
}
