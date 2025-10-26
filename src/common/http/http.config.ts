import type { ApiHeaders } from './http.types';

export const HttpDefaultConfig = {
  timeout: 10000,
}

export const HttpDefaultHeaders: ApiHeaders[] = [
  {
    key: 'Content-Type',
    value: 'application/json',
  },
] 