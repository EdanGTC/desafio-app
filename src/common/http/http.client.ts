import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import { HttpDefaultConfig, HttpDefaultHeaders } from './http.config';
import { ApiHeaders, InterceptorsConfig } from './http.types';
import { setupHttpClientRequestInterceptors } from './interceptors';

export class HttpClient {
  constructor(private readonly interceptors: InterceptorsConfig) {}

  public getClient(
    baseURL: string,
    defaultHeaders: ApiHeaders[] = HttpDefaultHeaders,
    timeout = HttpDefaultConfig.timeout,
  ): AxiosInstance {
    const headers = new AxiosHeaders();

    if (defaultHeaders && defaultHeaders?.length > 0) {
      defaultHeaders?.map(header => headers.set(header.key, header.value));
    }

    const axiosClient = axios.create({
      baseURL,
      headers,
      withCredentials: false,
      timeout,
    });

    if (this?.interceptors) {
      setupHttpClientRequestInterceptors(axiosClient, this.interceptors);
    }

    return axiosClient;
  }
}
