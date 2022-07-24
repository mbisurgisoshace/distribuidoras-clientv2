import BaseService from "./baseService";

interface AuthParams {
	username: string;
	password: string;
}

export default class AuthService extends BaseService {
    static loginRoute = '/auth/login';

    private static createAuthParams(username: string, password: string): AuthParams {
		return {
			username: username.trim(),
			password: password.trim()
		};
	}

    private static storeAuthToken(token: string): void {
		localStorage.setItem('__JWT_SECRET__', token);
	}

	private static storeUsername(username: string): void {
		localStorage.setItem('__USERNAME__', username);
	}

    public static async login(username: string, password: string): Promise<any> {
		try {
			const loginResponse = await this.postFormRequest<any>(
				this.loginRoute,
				this.createAuthParams(username, password)
			);

			if (loginResponse.status === 'success') {
				this.storeUsername(username);
				this.storeAuthToken(loginResponse.token);
			}

            return loginResponse;
		} catch (e) {
			return {
				status: 'error',
				error: 'Ha ocurrido un error al intentar loguearse.'
			};
		}
	}

	public static logout(): boolean {
		localStorage.clear();
		return true;
	}
}