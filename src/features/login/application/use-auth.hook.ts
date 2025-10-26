// Hook personalizado para manejar la autenticación

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  AuthState, 
  LoginCredentials, 
  User, 
  LoginError 
} from '../domain/login.domain';
import { LoginUseCase, LogoutUseCase, RefreshTokenUseCase } from './use-cases';
import { AuthRepositoryImpl } from '../infrastructure/auth.repository';

const authRepository = new AuthRepositoryImpl();

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
  isAuthenticated: false,
    token: null,
    isLoading: true,
    error: null
  });

  const loginUseCase = useMemo(() => new LoginUseCase(authRepository), []);
  const logoutUseCase = useMemo(() => new LogoutUseCase(authRepository), []);
  const refreshTokenUseCase = useMemo(() => new RefreshTokenUseCase(authRepository), []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
          const isValid = await authRepository.validateToken(token);
          
          if (isValid) {
            setAuthState({
              isAuthenticated: true,
              token,
              isLoading: false,
              error: null
            });
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_data');
            setAuthState({
              isAuthenticated: false,
              token: null,
              isLoading: false,
              error: null
            });
          }
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
        } catch (error) {
        console.error('Error al inicializar la autenticación:', error);
        setAuthState({
          isAuthenticated: false,
          token: null,
          isLoading: false,
          error: 'Error al inicializar la autenticación'
        });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await loginUseCase.execute(credentials);
      
      setAuthState({
        isAuthenticated: true,
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
        token: null,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error en logout:', error);
      setAuthState({
        isAuthenticated: false,
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
        token: response.token,
        isAuthenticated: true
      }));
    } catch (error) {
      console.error('Error en refresh token:', error);
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

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = localStorage.getItem('user_data');
        if (userData) {
          const currentUser = JSON.parse(userData);
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { user, isLoading };
};
