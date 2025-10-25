// Hook personalizado para manejar la autenticación

import { useState, useEffect, useCallback } from 'react';
import { 
  AuthState, 
  LoginCredentials, 
  LoginResponse, 
  User, 
  LoginError 
} from '../domain/types';
import { LoginUseCase, LogoutUseCase, RefreshTokenUseCase } from './use-cases';

export const useAuth = (authRepository: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
    error: null
  });

  const loginUseCase = new LoginUseCase(authRepository);
  const logoutUseCase = new LogoutUseCase(authRepository);
  const refreshTokenUseCase = new RefreshTokenUseCase(authRepository);

  // Inicializar estado de autenticación
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
          const user = JSON.parse(userData);
          const isValid = await authRepository.validateToken(token);
          
          if (isValid) {
            setAuthState({
              isAuthenticated: true,
              user,
              token,
              isLoading: false,
              error: null
            });
          } else {
            // Token inválido, intentar renovar
            await refreshToken();
          }
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
          error: 'Error al inicializar la autenticación'
        });
      }
    };

    initializeAuth();
  }, [authRepository]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await loginUseCase.execute(credentials);
      
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const loginError = error as LoginError;
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: loginError.message
      }));
      throw error;
    }
  }, [loginUseCase]);

  const logout = useCallback(async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      await logoutUseCase.execute();
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null
      });
    }
  }, [logoutUseCase]);

  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      const response = await refreshTokenUseCase.execute();
      setAuthState(prev => ({
        ...prev,
        user: response.user,
        token: response.token,
        isAuthenticated: true
      }));
    } catch (error) {
      // Si falla el refresh, hacer logout
      await logout();
    }
  }, [refreshTokenUseCase, logout]);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    logout,
    refreshToken,
    clearError
  };
};

// Hook para obtener el usuario actual
export const useCurrentUser = (authRepository: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await authRepository.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [authRepository]);

  return { user, isLoading };
};
