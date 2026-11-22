import { DEFAULT_SORT } from '../utils/filters.js';

/** Categorias exibidas em "Coleções em destaque" e no rodapé. */
export const CATEGORIES = [
  { slug: 'camisetas', name: 'Camisetas' },
  { slug: 'calcas', name: 'Calças' },
  { slug: 'bones', name: 'Bonés' },
  { slug: 'headphones', name: 'Headphones' },
  { slug: 'tenis', name: 'Tênis' },
];

export const categoryName = (slug) => CATEGORIES.find((c) => c.slug === slug)?.name ?? '';

/** Grupos da barra lateral de filtros. `key` é a chave do objeto de filtros. */
export const FILTER_GROUPS = [
  { key: 'brands', title: 'Marca', input: 'checkbox', options: ['Adidas', 'Balenciaga', 'K-Swiss', 'Nike', 'Puma'] },
  { key: 'categories', title: 'Categoria', input: 'checkbox', options: ['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'] },
  { key: 'genders', title: 'Gênero', input: 'checkbox', options: ['Masculino', 'Feminino', 'Unissex'] },
  { key: 'condition', title: 'Estado', input: 'radio', options: ['Novo', 'Usado'] },
];

export const SORT_OPTIONS = [
  { value: DEFAULT_SORT, label: 'mais relevantes' },
  { value: 'price-asc', label: 'menor preço' },
  { value: 'price-desc', label: 'maior preço' },
];

/** Opções iguais para todos os produtos (por enquanto). */
export const SIZES = ['39', '40', '41', '42', '43'];
export const COLORS = [
  { name: 'Azul', hex: '#5BE4F5' },
  { name: 'Rosa', hex: '#FF6B7B' },
  { name: 'Cinza', hex: '#555555' },
  { name: 'Roxo', hex: '#6C6BB5' },
];
export const RATING = { score: 4.5, count: 100 };
