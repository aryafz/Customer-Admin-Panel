import axios from 'axios';

let tenantId: string | null = null;
export const setTenantId = (id: string | null) => {
  tenantId = id;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(import.meta.env.VITE_AUTH_STORAGE_KEY || 'saas_customer_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (tenantId) {
    config.headers = config.headers || {};
    const headerName = import.meta.env.VITE_TENANT_HEADER_NAME || 'x-tenant-id';
    (config.headers as any)[headerName] = tenantId;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(import.meta.env.VITE_AUTH_STORAGE_KEY || 'saas_customer_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
