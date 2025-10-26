import type { GenericHttpResponseOnSuccessHandler, GenericHttpResponseOnRejectHandler } from '../http.types';

export const handleResponseOnSuccess: GenericHttpResponseOnSuccessHandler = async (response) => {
  console.log(`${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
  return response;
};

export const handleResponseOnRejected: GenericHttpResponseOnRejectHandler = async (error: any) => {
  console.error('Response interceptor error:', error);
  
  if (error.response?.status === 401) {
    console.warn('Token expirado o inválido');

    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  }
  
  return Promise.reject(error);
};
