import { PRODUCTS } from '../../data/products.js';
import { ApiError } from '../api.js';
import { normalizeText } from '../../utils/text.js';
import { finalPrice } from '../../utils/product.js';

/**
 * Implementação local do serviço de produtos. Reproduz o que o back-end fará:
 * filtrar, ordenar e paginar no "servidor", para que as páginas não precisem
 * mudar na hora da integração.
 */
function matches(product, f) {
  if (f.type && product.type !== f.type) return false;

  if (f.search) {
    const name = normalizeText(product.name);
    if (!normalizeText(f.search).split(/\s+/).every((token) => name.includes(token))) return false;
  }
  if (f.brands?.length && !f.brands.includes(product.brand)) return false;
  if (f.categories?.length && !f.categories.includes(product.category)) return false;
  if (f.genders?.length && !f.genders.includes(product.gender)) return false;
  if (f.condition && product.condition !== f.condition) return false;
  return true;
}

function sortProducts(list, sort) {
  if (sort === 'price-asc') return [...list].sort((a, b) => finalPrice(a) - finalPrice(b));
  if (sort === 'price-desc') return [...list].sort((a, b) => finalPrice(b) - finalPrice(a));
  return list; // 'relevance': ordem original
}

export const mockProductService = {
  async list(filters = {}) {
    const items = sortProducts(PRODUCTS.filter((p) => matches(p, filters)), filters.sort);
    return { items, total: items.length };
  },

  async getFeatured({ limit = 8 } = {}) {
    return PRODUCTS.slice(0, limit);
  },

  async getById(id) {
    const product = PRODUCTS.find((p) => String(p.id) === String(id));
    if (!product) throw new ApiError('Produto não encontrado.', 404);
    return product;
  },

  /** Os `limit` produtos seguintes ao atual (volta ao início ao chegar no fim). */
  async getRelated(id, { limit = 4 } = {}) {
    const index = PRODUCTS.findIndex((p) => String(p.id) === String(id));
    if (index === -1) return [];
    return Array.from({ length: limit }, (_, k) => PRODUCTS[(index + 1 + k) % PRODUCTS.length]);
  },
};
