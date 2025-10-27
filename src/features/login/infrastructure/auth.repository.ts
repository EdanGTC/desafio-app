// import { appHttpClientSingleton } from '@/common/http/appHttpClientSingleton'; // Para uso futuro
import type { 
  LoginCredentials, 
  LoginResponse, 
  AuthRepository 
} from '../domain/login.domain';

export class AuthRepositoryImpl implements AuthRepository {
  // private httpClient = appHttpClientSingleton; // Para uso futuro con APIs reales

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simular fake-login usando el singleton HTTP
    // const client = this.httpClient.getClient('https://jsonplaceholder.typicode.com');
    
    // Simular delay de red (como si fuera una llamada real)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Fake login - siempre retorna éxito con código 200
    const fakeResponse: LoginResponse = {
      token: `fake-token-${Date.now()}`,
      refreshToken: `fake-refresh-${Date.now()}`,
      user: {
        id: '1',
        name: 'Usuario Demo',
        email: credentials.email
      }
    };

    localStorage.setItem('auth_token', fakeResponse.token);
    localStorage.setItem('refresh_token', fakeResponse.refreshToken);
    localStorage.setItem('user_data', JSON.stringify(fakeResponse.user));

    return fakeResponse;
  }

  async logout(): Promise<void> {
    // Simular logout usando el singleton HTTP
    // const client = this.httpClient.getClient('https://jsonplaceholder.typicode.com');
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');

  }

  async validateToken(token: string): Promise<boolean> {
    // Simular validación usando el singleton HTTP
    // const client = this.httpClient.getClient('https://jsonplaceholder.typicode.com');
    
    // Simular delay de validación
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Validar que el token existe y tiene el formato correcto
    const isValid = !!token && token.startsWith('fake-token-');
    
    return isValid;
  }

  async refreshToken(_refreshToken: string): Promise<LoginResponse> {
    // El parámetro _refreshToken se usa para la interfaz, pero en el fake no lo necesitamos
    // Simular refresh usando el singleton HTTP
    // const client = this.httpClient.getClient('https://jsonplaceholder.typicode.com');
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generar nuevos tokens
    const newResponse: LoginResponse = {
      token: `fake-token-${Date.now()}`,
      refreshToken: `fake-refresh-${Date.now()}`,
      user: {
        id: '1',
        name: 'Usuario Demo',
        email: 'demo@example.com'
      }
    };

    localStorage.setItem('auth_token', newResponse.token);
    localStorage.setItem('refresh_token', newResponse.refreshToken);
    localStorage.setItem('user_data', JSON.stringify(newResponse.user));

    return newResponse;
  }
}
