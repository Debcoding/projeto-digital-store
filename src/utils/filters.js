/**
 * Conversão entre a query string da URL (em português, amigável) e o objeto
 * de filtros usado pela aplicação e pelos serviços (chaves em inglês).
 *
 *  URL                         objeto de filtros
 *  ?tipo=tenis             ->  type: 'tenis'
 *  ?q=jordan               ->  search: 'jordan'
 *  ?marca=Nike&marca=Puma  ->  brands: ['Nike', 'Puma']
 *  ?categoria=Casual       ->  categories: ['Casual']
 *  ?genero=Unissex         ->  genders: ['Unissex']
 *  ?estado=Novo            ->  condition: 'Novo'
 *  ?ordem=price-asc        ->  sort: 'price-asc'
 */
export const DEFAULT_SORT = 'relevance';

export function parseFilters(searchParams) {
  return {
    type: searchParams.get('tipo') || '',
    search: (searchParams.get('q') || '').trim(),
    brands: searchParams.getAll('marca'),
    categories: searchParams.getAll('categoria'),
    genders: searchParams.getAll('genero'),
    condition: searchParams.get('estado') || '',
    sort: searchParams.get('ordem') || DEFAULT_SORT,
  };
}

export function serializeFilters(filters) {
  const params = new URLSearchParams();
  if (filters.type) params.set('tipo', filters.type);
  if (filters.search) params.set('q', filters.search);
  filters.brands.forEach((value) => params.append('marca', value));
  filters.categories.forEach((value) => params.append('categoria', value));
  filters.genders.forEach((value) => params.append('genero', value));
  if (filters.condition) params.set('estado', filters.condition);
  if (filters.sort && filters.sort !== DEFAULT_SORT) params.set('ordem', filters.sort);
  return params;
}
