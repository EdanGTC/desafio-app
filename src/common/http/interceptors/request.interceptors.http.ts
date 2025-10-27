import type { GenericHttpRequestOnSuccessHandler, GenericHttpRequestOnRejectHandler } from '../http.types';

export const handleRequestOnSuccess: GenericHttpRequestOnSuccessHandler = async (config) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};

export const handleRequestOnRejected: GenericHttpRequestOnRejectHandler = async (error) => {
  return Promise.reject(error);
};
