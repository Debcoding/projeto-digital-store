import { USE_MOCK } from '../config/env.js';
import { api } from './api.js';
import { toProduct, toProductList, toProductsQuery } from './adapters.js';
import { mockProductService } from './mock/productMock.js';

/**
 * Serviço de produtos. As páginas só conhecem esta interface:
 *
 *   list(filters, { signal })        -> { items, total }
 *   getFeatured({ limit, signal })   -> Product[]
 *   getById(id, { signal })          -> Product   (404 => ApiError.status === 404)
 *   getRelated(id, { limit, signal })-> Product[]
 *
 * Com VITE_USE_MOCK=true usa dados locais; com false chama a API REST.
 */
const remoteProductService = {
  async list(filters = {}, { signal } = {}) {
    const response = await api.get('/products', { params: toProductsQuery(filters), signal });
    return toProductList(response);
  },

  async getFeatured({ limit = 8, signal } = {}) {
    const response = await api.get('/products', { params: { featured: true, limit }, signal });
    return toProductList(response).items;
  },

  async getById(id, { signal } = {}) {
    return toProduct(await api.get(`/products/${encodeURIComponent(id)}`, { signal }));
  },

  async getRelated(id, { limit = 4, signal } = {}) {
    const response = await api.get(`/products/${encodeURIComponent(id)}/related`, { params: { limit }, signal });
    return toProductList(response).items;
  },
};

export const productService = USE_MOCK ? mockProductService : remoteProductService;
