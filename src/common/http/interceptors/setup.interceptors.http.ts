import { AxiosInstance } from 'axios';
import {
  InterceptorsConfig,
  RequestInterceptorPairs,
  ResponseInterceptorPairs,
} from '../http.types';

const ResponseInterceptorSetup = (
  client: AxiosInstance,
  interceptorPairs?: ResponseInterceptorPairs,
) => {
  if (interceptorPairs && interceptorPairs?.length > 0) {
    interceptorPairs.forEach(interceptor =>
      client.interceptors.response.use(
        interceptor.onSuccess,
        interceptor.onReject,
      ),
    );
  }
};

const RequestInterceptorHttp = (
  client: AxiosInstance,
  interceptorPairs?: RequestInterceptorPairs,
) => {
  if (interceptorPairs && interceptorPairs?.length > 0) {
    interceptorPairs.forEach(interceptor =>
      client.interceptors.request.use(
        interceptor.onSuccess,
        interceptor.onReject,
      ),
    );
  }
};

export const setupHttpClientRequestInterceptors = (
  client: AxiosInstance,
  interceptors: InterceptorsConfig,
) => {
  RequestInterceptorHttp(client, interceptors?.request);
  ResponseInterceptorSetup(client, interceptors?.response);
};
