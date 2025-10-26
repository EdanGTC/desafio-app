import { AxiosInstance } from 'axios';
import {
  InterceptorsConfig,
  RequestInterceptorPairs,
  ResponseInterceptorPairs,
} from '../http.types';
import {
  handleLogRequest,
  handleLogRequestError,
} from './handlers/logger-handler.request.interceptors.http';
import {
  handleLogResponse,
  handleLogResponseError,
} from './handlers/logger-handler.response.interceptors.http';

const ResponseInterceptorSetup = (
  client: AxiosInstance,
  interceptorPairs?: ResponseInterceptorPairs,
) => {
  client.interceptors.response.use(handleLogResponse, handleLogResponseError);

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
  client.interceptors.request.use(handleLogRequest, handleLogRequestError);

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
