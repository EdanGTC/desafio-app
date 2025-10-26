import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type ApiHeaders = {
  key: string;
  value: string;
};

export type GenericHttpRequestOnSuccessHandler = (
  config: InternalAxiosRequestConfig<unknown>,
) =>
  | InternalAxiosRequestConfig<unknown>
  | Promise<InternalAxiosRequestConfig<unknown>>;

export type GenericHttpRequestOnRejectHandler = (
  error: unknown,
) => Promise<never>;

export type GenericHttpResponseOnSuccessHandler = (
  value: AxiosResponse<unknown, unknown>,
) => AxiosResponse<unknown, unknown> | Promise<AxiosResponse<unknown, unknown>>;

export type GenericHttpResponseOnRejectHandler = (
  error: unknown,
) => Promise<never>;

export type ResponseInterceptorPairs = {
  onSuccess: GenericHttpResponseOnSuccessHandler;
  onReject: GenericHttpResponseOnRejectHandler;
}[];

export type RequestInterceptorPairs = {
  onSuccess: GenericHttpRequestOnSuccessHandler;
  onReject: GenericHttpRequestOnRejectHandler;
}[];

export type InterceptorsConfig = {
  request: RequestInterceptorPairs;
  response: ResponseInterceptorPairs;
};
