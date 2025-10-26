import { InterceptorsConfig } from './http.types';
import { HttpClient } from './http.client';
import {
  handleRequestOnRejected,
  handleRequestOnSuccess,
} from './interceptors';
import {
  handleResponseOnRejected,
  handleResponseOnSuccess,
} from './interceptors';

const interceptors: InterceptorsConfig = {
  response: [
    {
      onSuccess: handleResponseOnSuccess,
      onReject: handleResponseOnRejected,
    },
  ],
  request: [
    {
      onSuccess: handleRequestOnSuccess,
      onReject: handleRequestOnRejected,
    },
  ],
};

export const appHttpClientSingleton = new HttpClient(interceptors);
