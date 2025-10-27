import type { GenericHttpResponseOnSuccessHandler, GenericHttpResponseOnRejectHandler } from '../http.types';

export const handleResponseOnSuccess: GenericHttpResponseOnSuccessHandler = async (response) => {
  return response;
};

export const handleResponseOnRejected: GenericHttpResponseOnRejectHandler = async (error: unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { status?: number } };
    
    if (axiosError.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  }
  
  return Promise.reject(error);
};
