import { API_URL } from '../config/env.js';

/** Erro padronizado para respostas HTTP fora da faixa 2xx. */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/** Token JWT guardado no navegador (usado quando houver autenticação). */
const TOKEN_KEY = 'digital-store:token';
export const tokenStorage = {
  get() {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  },
  set(token) {
    try { localStorage.setItem(TOKEN_KEY, token); } catch { /* armazenamento indisponível */ }
  },
  clear() {
    try { localStorage.removeItem(TOKEN_KEY); } catch { /* armazenamento indisponível */ }
  },
};

function buildUrl(path, params) {
  const base = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
  const url = new URL(path.replace(/^\//, ''), base.startsWith('http') ? base : window.location.origin + base);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    [].concat(value ?? []).forEach((item) => {
      if (item !== '' && item != null) url.searchParams.append(key, item);
    });
  });
  return url;
}

async function request(path, { method = 'GET', params, body, signal, headers } = {}) {
  const token = tokenStorage.get();
  const response = await fetch(buildUrl(path, params), {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = response.status === 204 ? null : isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = (data && data.message) || `Erro ${response.status} ao acessar a API.`;
    throw new ApiError(message, response.status, data);
  }
  return data;
}

/** Cliente HTTP único do projeto. Todos os serviços passam por aqui. */
export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
