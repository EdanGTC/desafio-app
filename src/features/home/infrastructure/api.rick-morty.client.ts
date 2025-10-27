import { appHttpClientSingleton } from '@/common/http/appHttpClientSingleton';
import { API_CONFIG } from '@/shared/constants';

export const getApiRickMorty = () => {
  return appHttpClientSingleton.getClient(API_CONFIG.BASE_URL, [
    {
      key: 'Content-Type',
      value: 'application/json',
    },
  ]);
};

