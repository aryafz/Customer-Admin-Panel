import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

let tenantId: string | null = null;

export const setTenantId = (id: string | null) => {
  tenantId = id;
};

const tokenKey = import.meta.env.VITE_AUTH_STORAGE_KEY || 'saas_customer_token';
const tenantHeader = import.meta.env.VITE_TENANT_HEADER_NAME || 'x-tenant-id';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const siteBoundPaths = ['/site-plans', '/site-features', '/site-themes', '/payments'];

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (tenantId && config.url && siteBoundPaths.some((p) => config.url?.includes(p))) {
    config.headers = config.headers || {};
    (config.headers as any)[tenantHeader] = tenantId;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(tokenKey);
      window.location.href = '/login';
    }
    const message = (error.response?.data as any)?.message || error.message;
    return Promise.reject(message);
  }
);

export default api;
