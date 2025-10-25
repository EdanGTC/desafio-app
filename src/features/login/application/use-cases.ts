// Use cases para la feature de login

import type { 
  LoginCredentials, 
  LoginResponse, 
  AuthRepository, 
  LoginError 
} from '../domain/types';

export class LoginUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Validaciones de negocio
      if (!credentials.email || !credentials.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      if (!this.isValidEmail(credentials.email)) {
        throw new Error('El formato del email no es válido');
      }

      if (credentials.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Ejecutar el login
      const response = await this.authRepository.login(credentials);
      
      // Guardar token en localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user_data', JSON.stringify(response.user));

      return response;
    } catch (error) {
      const loginError: LoginError = {
        code: 'LOGIN_FAILED',
        message: error instanceof Error ? error.message : 'Error desconocido durante el login'
      };
      throw loginError;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export class LogoutUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<void> {
    try {
      // Limpiar datos locales
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');

      // Ejecutar logout en el repositorio
      await this.authRepository.logout();
    } catch (error) {
      console.error('Error durante el logout:', error);
      // Aún así limpiamos los datos locales
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }
  }
}

export class RefreshTokenUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<LoginResponse> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No hay refresh token disponible');
      }

      const response = await this.authRepository.refreshToken(refreshToken);
      
      // Actualizar tokens
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user_data', JSON.stringify(response.user));

      return response;
    } catch (error) {
      const loginError: LoginError = {
        code: 'REFRESH_FAILED',
        message: error instanceof Error ? error.message : 'Error al renovar el token'
      };
      throw loginError;
    }
  }
}
